import { z } from "zod";

// Scorecard is auto-generated, but this schema is for manual trigger if needed
export const createScorecardSchema = z.object({
  sessionId: z.string().uuid(),
});

export type CreateScorecardInput = z.infer<typeof createScorecardSchema>;
