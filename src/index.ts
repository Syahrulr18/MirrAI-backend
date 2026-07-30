import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler.middleware";
import { generalLimiter } from "./middleware/rateLimiter.middleware";

// Route imports
import { sessionRouter } from "./routes/session.routes";
import { scorecardRouter } from "./routes/scorecard.routes";
import { analyticsRouter } from "./routes/analytics.routes";
import { gamificationRouter } from "./routes/gamification.routes";
import { scriptsRouter } from "./routes/scripts.routes";
import { learningRouter } from "./routes/learning.routes";
import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import { chatbotRouter } from "./routes/chatbot.routes";

const app = express();

// ─── Global Middleware ──────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL.replace(/\/$/, ""), credentials: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(generalLimiter);

// ─── Health Check (no auth) ────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ─── API Routes ─────────────────────────────────────────────
app.use("/api/auth", authRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/scorecards", scorecardRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/gamification", gamificationRouter);
app.use("/api/scripts", scriptsRouter);
app.use("/api/learning", learningRouter);
app.use("/api/users", userRouter);
app.use("/api/chatbot", chatbotRouter);

// ─── Error Handler (must be last) ──────────────────────────
app.use(errorHandler);

// ─── Start Server ───────────────────────────────────────────
const PORT = parseInt(env.PORT, 10);

app.listen(PORT, () => {
  console.log(`MirrAI Backend running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;
