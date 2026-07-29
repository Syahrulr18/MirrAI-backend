import { z } from "zod";

export const SUPPORTED_LANGUAGES = ["en", "id"] as const;

export const chatMessageSchema = z.object({
  message: z.string().min(1).max(2000),
  language: z.enum(SUPPORTED_LANGUAGES).optional(),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
