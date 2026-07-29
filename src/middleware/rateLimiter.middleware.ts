import rateLimit from "express-rate-limit";

// General API rate limiter
export const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { data: null, error: { message: "Too many requests, please try again later." } },
});

// Stricter limiter for session submission (prevent spam)
export const sessionLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { data: null, error: { message: "Too many session submissions, please slow down." } },
});

// Strict limiter for AI chatbot (preserve Gemini free tier quota)
export const chatbotLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { data: null, error: { message: "Coach is busy, please try again in a moment." } },
});
