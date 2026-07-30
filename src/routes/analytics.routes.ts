import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { prisma } from "../config/prisma";

export const analyticsRouter = Router();

analyticsRouter.use(authMiddleware);

// GET /api/analytics/trends — Filler words per session, eye contact % over time
analyticsRouter.get("/trends", async (req, res, next) => {
  try {
    const userId = req.user!.id;
    // Get last 15 sessions, newest first, then reverse so chart displays chronologically
    const sessions = await prisma.practiceSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 15
    });

    // Reverse so oldest is first for chart display
    sessions.reverse();

    const data = sessions.map(session => {
      const totalEyeTime = session.eyeContactGoodSec + session.eyeContactBadSec;
      const eyeContactPercent = totalEyeTime > 0 ? (session.eyeContactGoodSec / totalEyeTime) * 100 : 0;
      return {
        id: session.id,
        date: session.createdAt.toISOString(),
        fillerWords: session.fillerWordCount,
        eyeContactPercent: Math.round(eyeContactPercent)
      };
    });

    res.json({ data, error: null });
  } catch (err) {
    next(err);
  }
});

// GET /api/analytics/consistency — Practice timestamps
analyticsRouter.get("/consistency", async (req, res, next) => {
  try {
    const userId = req.user!.id;
    // Get all sessions from the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const sessions = await prisma.practiceSession.findMany({
      where: {
        userId,
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      select: { createdAt: true }
    });

    const timestamps = sessions.map(s => s.createdAt.toISOString());

    res.json({
      data: timestamps,
      error: null
    });
  } catch (err) {
    next(err);
  }
});
