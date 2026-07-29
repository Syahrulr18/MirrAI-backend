import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

export const scorecardRouter = Router();

scorecardRouter.use(authMiddleware);

// POST /api/scorecards — Trigger scorecard calculation for a session
scorecardRouter.post("/", async (req, res, next) => {
  try {
    res.status(501).json({ data: null, error: { message: "Not implemented yet" } });
  } catch (err) {
    next(err);
  }
});
