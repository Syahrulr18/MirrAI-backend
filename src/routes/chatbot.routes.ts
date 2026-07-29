import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { chatbotLimiter } from "../middleware/rateLimiter.middleware";
import { chatMessageSchema } from "../schemas/chatbot.schema";
import { ChatbotService } from "../services/chatbot.service";

export const chatbotRouter = Router();

chatbotRouter.use(authMiddleware);

// POST /api/chatbot/message — Send message to AI Coach
chatbotRouter.post("/message", chatbotLimiter, validate(chatMessageSchema), async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const { message, language } = req.body;
    const response = await ChatbotService.handleMessage(userId, message, language);
    res.json({ data: response, error: null });
  } catch (err) {
    next(err);
  }
});

// GET /api/chatbot/history — Get chat history (paginated)
chatbotRouter.get("/history", async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
    const history = await ChatbotService.getHistory(userId, limit, offset);
    res.json({ data: history, error: null });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/chatbot/history — Clear chat history
chatbotRouter.delete("/history", async (req, res, next) => {
  try {
    // Left empty for now, could add to ChatbotService if needed
    res.status(501).json({ data: null, error: { message: "Not implemented yet" } });
  } catch (err) {
    next(err);
  }
});
