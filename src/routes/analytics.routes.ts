import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { prisma } from "../config/prisma";

export const analyticsRouter = Router();

analyticsRouter.use(authMiddleware);

// GET /api/analytics/trends — Filler words per session, eye contact % over time
analyticsRouter.get("/trends", async (req, res, next) => {
  try {
    const userId = req.user!.id;
    // Get last 15 sessions, ordered by date ascending so oldest is first for chart
    const sessions = await prisma.practiceSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      take: 15
    });

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

// GET /api/analytics/consistency — Current month practice heatmap data
analyticsRouter.get("/consistency", async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed

    const firstDay = new Date(year, month, 1);
    firstDay.setHours(0, 0, 0, 0);
    const lastDay = new Date(year, month + 1, 0); // last day of current month
    const daysInMonth = lastDay.getDate();

    const sessions = await prisma.practiceSession.findMany({
      where: {
        userId,
        createdAt: {
          gte: firstDay,
          lte: new Date(year, month, daysInMonth, 23, 59, 59, 999)
        }
      },
      select: { createdAt: true }
    });

    // Generate all days of the current month (1 to daysInMonth)
    const consistencyData: { date: string; practiced: boolean }[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const yearStr = String(year);
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const dateStr = `${yearStr}-${monthStr}-${dayStr}`;
      consistencyData.push({
        date: dateStr,
        practiced: false
      });
    }

    sessions.forEach(session => {
      const sDate = session.createdAt;
      const yearStr = String(sDate.getFullYear());
      const monthStr = String(sDate.getMonth() + 1).padStart(2, '0');
      const dayStr = String(sDate.getDate()).padStart(2, '0');
      const dateStr = `${yearStr}-${monthStr}-${dayStr}`;
      const found = consistencyData.find(d => d.date === dateStr);
      if (found) {
        found.practiced = true;
      }
    });

    res.json({
      data: consistencyData,
      meta: { year, month: month + 1, daysInMonth },
      error: null
    });
  } catch (err) {
    next(err);
  }
});
