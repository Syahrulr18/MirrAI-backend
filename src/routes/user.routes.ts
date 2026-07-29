import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { userService } from "../services/user.service";
import { z } from "zod/v4";
import { validate } from "../middleware/validate.middleware";

export const userRouter = Router();

// ─── Public: Sync user from Supabase Auth ─────────────────
const syncBodySchema = z.object({
  id: z.string().uuid(),
  email: z.email(),
  displayName: z.string().optional(),
});

userRouter.post(
  "/sync",
  authMiddleware,
  validate(syncBodySchema),
  async (req, res, next) => {
    try {
      const user = await userService.syncUser(req.body);
      res.status(200).json({ data: user, error: null });
    } catch (err) {
      next(err);
    }
  }
);

// ─── Protected: Get current user profile ──────────────────
userRouter.get("/me", authMiddleware, async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const user = await userService.getUserById(userId);

    if (!user) {
      res.status(404).json({ data: null, error: { message: "User not found" } });
      return;
    }

    res.status(200).json({ data: user, error: null });
  } catch (err) {
    next(err);
  }
});

// ─── Protected: Update current user profile ───────────────
const updateBodySchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  preferredLanguage: z.enum(["en", "id"]).optional(),
});

userRouter.patch(
  "/me",
  authMiddleware,
  validate(updateBodySchema),
  async (req, res, next) => {
    try {
      const userId = (req as any).user.id;
      const user = await userService.updateUser(userId, req.body);
      res.status(200).json({ data: user, error: null });
    } catch (err) {
      next(err);
    }
  }
);
