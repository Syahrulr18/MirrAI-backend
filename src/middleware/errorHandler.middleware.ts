import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("[Error]", err.stack || err.message);

  // Don't expose stack traces in production
  const isProduction = process.env.NODE_ENV === "production";

  res.status(500).json({
    data: null,
    error: {
      message: isProduction ? "Internal server error" : err.message,
    },
  });
}
