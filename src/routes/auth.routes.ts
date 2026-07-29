import { Router } from "express";
import { supabase } from "../config/supabase";
import { z } from "zod/v4";
import { validate } from "../middleware/validate.middleware";

export const authRouter = Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(1),
});

authRouter.post(
  "/signup",
  validate(signupSchema),
  async (req, res, next) => {
    try {
      const { email, password, displayName } = req.body;

      // Use the Admin API to create a user and explicitly auto-confirm their email,
      // bypassing the restrictive settings in the Supabase Dashboard.
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          display_name: displayName,
        },
      });

      if (error) {
        res.status(400).json({ data: null, error: { message: error.message } });
        return;
      }

      res.status(201).json({ data: { id: data.user.id }, error: null });
    } catch (err) {
      next(err);
    }
  }
);
