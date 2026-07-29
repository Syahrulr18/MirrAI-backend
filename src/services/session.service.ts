import { prisma } from "../config/prisma";
import { CreateSessionInput } from "../schemas/session.schema";

export class SessionService {
  /**
   * Create a new practice session with scorecard
   */
  static async createSession(userId: string, input: CreateSessionInput) {
    const totalSec = Math.max(input.durationActual || 1, 1);
    const totalEyeSec = (input.eyeContactGoodSec || 0) + (input.eyeContactBadSec || 0);

    // Calculate Eye Contact Score (0-100)
    const eyeContactPercentage = totalEyeSec > 0
      ? Math.min(100, Math.max(0, Math.round((input.eyeContactGoodSec / totalEyeSec) * 100)))
      : 100;

    // Posture score
    const flagsCount = Array.isArray(input.postureFlags) ? input.postureFlags.length : 0;
    const posturePenaltyRate = (flagsCount / totalSec) * 60;
    const postureScore = Math.max(0, Math.min(100, Math.round(100 - posturePenaltyRate * 12)));

    // Body Language Score = 60% Eye Contact + 40% Posture
    const bodyLanguageScore = Math.round(eyeContactPercentage * 0.6 + postureScore * 0.4) || 0;

    // WPM Score
    let wpmScore = 100;
    const avgWpm = input.avgWpm || 0;
    if (avgWpm < 100) {
      wpmScore = Math.max(30, Math.round(100 - (100 - avgWpm) * 0.9));
    } else if (avgWpm > 160) {
      wpmScore = Math.max(30, Math.round(100 - (avgWpm - 160) * 0.8));
    }

    // Filler score
    const fillerCount = input.fillerWordCount || 0;
    const fillersPerMin = (fillerCount / totalSec) * 60;
    const fillerScore = Math.max(0, Math.min(100, Math.round(100 - fillersPerMin * 8)));

    // Voice & Fluency Score = 50% WPM + 50% Filler score
    const voiceFluencyScore = Math.round(wpmScore * 0.5 + fillerScore * 0.5) || 0;

    // Overall Score (Incorporate script accuracy if present)
    let totalScore = 0;
    if (input.scriptAccuracy !== undefined && input.scriptAccuracy !== null) {
      // 35% Body Language + 35% Voice & Fluency + 30% Script Accuracy
      totalScore = Math.round(
        bodyLanguageScore * 0.35 + voiceFluencyScore * 0.35 + input.scriptAccuracy * 0.30
      ) || 0;
    } else {
      // 50% Body Language + 50% Voice & Fluency
      totalScore = Math.round(bodyLanguageScore * 0.5 + voiceFluencyScore * 0.5) || 0;
    }

    // Create PracticeSession + Scorecard in transaction
    const session = await prisma.practiceSession.create({
      data: {
        userId,
        mode: input.mode,
        durationTarget: input.durationTarget,
        durationActual: input.durationActual,
        eyeContactGoodSec: input.eyeContactGoodSec,
        eyeContactBadSec: input.eyeContactBadSec,
        fillerWordCount: input.fillerWordCount,
        fillerWordTimestamps: input.fillerWordTimestamps as any,
        avgWpm: input.avgWpm,
        wpmSamples: input.wpmSamples as any,
        postureFlags: input.postureFlags as any,
        scorecard: {
          create: {
            totalScore,
            bodyLanguageScore,
            voiceFluencyScore,
            scriptAccuracy: input.scriptAccuracy,
          },
        },
      },
      include: {
        scorecard: true,
      },
    });

    // Update or create UserStreak
    const streak = await prisma.userStreak.findUnique({ where: { userId } });
    const now = new Date();

    if (!streak) {
      await prisma.userStreak.create({
        data: {
          userId,
          currentStreak: 1,
          longestStreak: 1,
          lastPracticedAt: now,
        },
      });
    } else {
      const last = streak.lastPracticedAt ? new Date(streak.lastPracticedAt) : null;
      const isToday = last && last.toDateString() === now.toDateString();

      if (!isToday) {
        const isYesterday =
          last &&
          new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString() ===
            last.toDateString();

        const newCurrent = isYesterday ? streak.currentStreak + 1 : 1;
        const newLongest = Math.max(newCurrent, streak.longestStreak);

        await prisma.userStreak.update({
          where: { userId },
          data: {
            currentStreak: newCurrent,
            longestStreak: newLongest,
            lastPracticedAt: now,
          },
        });
      }
    }

    return session;
  }

  /**
   * Get single session by ID
   */
  static async getSessionById(sessionId: string, userId: string) {
    return prisma.practiceSession.findFirst({
      where: { id: sessionId, userId },
      include: { scorecard: true },
    });
  }

  /**
   * Get user session history
   */
  static async getUserSessions(userId: string, limit = 10, offset = 0) {
    return prisma.practiceSession.findMany({
      where: { userId },
      include: { scorecard: true },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });
  }

  /**
   * Get dashboard statistics
   */
  static async getDashboardStats(userId: string) {
    // Total sessions
    const totalSessions = await prisma.practiceSession.count({
      where: { userId }
    });

    // Average Score
    const scorecards = await prisma.scorecard.findMany({
      where: { session: { userId } },
      select: { totalScore: true }
    });
    
    let avgScore = null;
    if (scorecards.length > 0) {
      const sum = scorecards.reduce((acc, curr) => acc + curr.totalScore, 0);
      avgScore = Math.round(sum / scorecards.length);
    }

    // Streak
    const streakData = await prisma.userStreak.findUnique({
      where: { userId }
    });

    // Determine current streak freshness (did they lose it?)
    let currentStreak = streakData?.currentStreak || 0;
    if (streakData?.lastPracticedAt) {
      const now = new Date();
      const last = new Date(streakData.lastPracticedAt);
      
      // If the last practice was before yesterday, streak is broken
      const yesterdayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      if (last < yesterdayStart) {
        currentStreak = 0;
      }
    }

    return {
      totalSessions,
      avgScore,
      currentStreak
    };
  }
}
