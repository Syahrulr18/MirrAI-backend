import { prisma } from "../config/prisma";
import OpenAI from "openai";
import { env } from "../config/env";

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: env.OPENROUTER_API_KEY,
});

const PUBLIC_SPEAKING_COACH_PROMPT = `
You are MirrAI, an expert Public Speaking Coach and Professional Communication Mentor. Your mission is to help users overcome stage fright, improve their articulation, structure compelling speeches, and master both verbal and non-verbal communication skills.

### CORE OPERATING RULES:
1. **Dynamic Language Mirroring (CRITICAL):** You MUST strictly detect and respond in the exact same language used by the user in their most recent message. If the user speaks Indonesian, respond entirely in natural, engaging Indonesian. If the user speaks English, respond in English. If the user switches languages, you switch immediately.
2. **Tone & Personality:** Be encouraging, empathetic, highly supportive, yet candid and constructive. Celebrate small wins while providing clear, actionable feedback. Never be overly harsh, but do not sugarcoat areas needing improvement.
3. **Structured Feedback:** When analyzing a speech draft or presentation outline, always evaluate based on:
   - **Hook & Opening:** Is it engaging? Does it grab attention?
   - **Clarity & Structure:** Are the main points logical and easy to follow?
   - **Tone & Audience Adaptation:** Does the style match the target audience?
   - **Call to Action (CTA) / Closing:** Is the conclusion memorable and impactful?

### HOW TO INTERACT:
- **Speech Review:** If the user shares a draft, provide a polite critique, highlight strong sentences, and offer a polished/improved version of weak sections.
- **Roleplay / Simulation:** If requested, simulate an audience or an interviewer asking tough Q&A questions to practice spontaneous thinking.
- **Anxiety & Stage Fright:** Offer practical, science-backed breathing exercises, mental reframing techniques, and preparation tips to calm their nerves.
- **Step-by-Step Guidance:** Do not overwhelm the user with too much information at once. Provide digestible, bite-sized advice and ask a guiding question at the end of your response to keep the coaching session interactive.
`;

export class ChatbotService {
  static async handleMessage(userId: string, message: string, language: string = "en") {
    let aiText = "";

    try {
      // 1. Fetch previous history to give context (optional but good for multi-turn)
      const rawHistory = await prisma.chatMessage.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      });
      
      // Reverse to chronological order and map to OpenAI format
      const chatHistory = rawHistory.reverse().map(msg => ({
        role: msg.role === "USER" ? "user" as const : "assistant" as const,
        content: msg.content
      }));

      const modelsToTry = [
        "deepseek/deepseek-r1:free", // User's preferred
        "google/gemma-4-31b-it:free", // Fallback 1
        "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free" // Fallback 2
      ];

      let response;
      for (const model of modelsToTry) {
        try {
          response = await openrouter.chat.completions.create({
            model: model, 
            messages: [
              { role: "system", content: PUBLIC_SPEAKING_COACH_PROMPT },
              ...chatHistory,
              { role: "user", content: message },
            ],
            temperature: 0.6, 
            max_tokens: 1000,
          });
          break; // success
        } catch (err: any) {
          console.warn(`[ChatbotService] OpenRouter model ${model} failed:`, err.message);
        }
      }

      if (!response) {
        throw new Error("All free OpenRouter models failed or are currently unavailable.");
      }

      aiText = response.choices[0]?.message?.content || "Maaf, Coach sedang mengalami gangguan teknis sejenak.";
    } catch (apiError: any) {
      console.error("[ChatbotService] OpenRouter API error:", apiError.message);
      aiText = language === "id"
        ? "Maaf, AI Coach sedang mengalami gangguan teknis sejenak. Silakan coba lagi nanti."
        : "Sorry, the AI Coach is experiencing technical issues. Please try again later.";
    }

    // 3. Save to DB
    try {
      await prisma.chatMessage.createMany({
        data: [
          { userId, role: "USER", content: message },
          { userId, role: "MODEL", content: aiText },
        ],
      });
    } catch (dbError: any) {
      console.error("[ChatbotService] DB save error (non-fatal):", dbError.message);
    }

    return { text: aiText };
  }

  static async getHistory(userId: string, limit: number = 20, offset: number = 0) {
    return prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });
  }
}
