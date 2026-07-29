import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

export const gamificationRouter = Router();

gamificationRouter.use(authMiddleware);

import { SessionService } from "../services/session.service";

// GET /api/gamification/stats — Dashboard stats (streak, sessions, avg score)
gamificationRouter.get("/stats", async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const stats = await SessionService.getDashboardStats(userId);
    res.json({ data: stats, error: null });
  } catch (err) {
    next(err);
  }
});

// GET /api/gamification/badges — All badges with unlock status for user
gamificationRouter.get("/badges", async (req, res, next) => {
  try {
    res.status(501).json({ data: null, error: { message: "Not implemented yet" } });
  } catch (err) {
    next(err);
  }
});
