import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { sessionLimiter } from "../middleware/rateLimiter.middleware";
import { createSessionSchema } from "../schemas/session.schema";
import { SessionService } from "../services/session.service";

export const sessionRouter = Router();

sessionRouter.use(authMiddleware);

// POST /api/sessions — Create new practice session with raw metrics
sessionRouter.post("/", sessionLimiter, validate(createSessionSchema), async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const session = await SessionService.createSession(userId, req.body);
    res.status(201).json({ data: session, error: null });
  } catch (err) {
    next(err);
  }
});

// GET /api/sessions — List user sessions
sessionRouter.get("/", async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const sessions = await SessionService.getUserSessions(userId, limit, offset);
    res.json({ data: sessions, error: null });
  } catch (err) {
    next(err);
  }
});

// GET /api/sessions/:id — Get single session with scorecard
sessionRouter.get("/:id", async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const session = await SessionService.getSessionById(req.params.id, userId);

    if (!session) {
      res.status(404).json({ data: null, error: { message: "Session not found" } });
      return;
    }

    res.json({ data: session, error: null });
  } catch (err) {
    next(err);
  }
});
