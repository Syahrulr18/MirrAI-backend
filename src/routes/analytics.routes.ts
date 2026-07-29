import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

export const analyticsRouter = Router();

analyticsRouter.use(authMiddleware);

// GET /api/analytics/trends — Filler words per session, eye contact % over time
analyticsRouter.get("/trends", async (req, res, next) => {
  try {
    res.status(501).json({ data: null, error: { message: "Not implemented yet" } });
  } catch (err) {
    next(err);
  }
});

// GET /api/analytics/consistency — 7/30 day practice heatmap data
analyticsRouter.get("/consistency", async (req, res, next) => {
  try {
    res.status(501).json({ data: null, error: { message: "Not implemented yet" } });
  } catch (err) {
    next(err);
  }
});
