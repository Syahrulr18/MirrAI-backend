import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ data: null, error: { message: "Missing or invalid authorization header" } });
      return;
    }

    const token = authHeader.split(" ")[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({ data: null, error: { message: "Invalid or expired token" } });
      return;
    }

    req.user = {
      id: data.user.id,
      email: data.user.email || "",
    };

    next();
  } catch (err) {
    res.status(401).json({ data: null, error: { message: "Authentication failed" } });
  }
}
