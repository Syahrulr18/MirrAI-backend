import { z } from "zod";

export const createSessionSchema = z.object({
  mode: z.enum(["THESIS_DEFENSE", "JOB_INTERVIEW_PITCH", "PUBLIC_SPEECH"]),
  durationTarget: z.number().int().positive(),
  durationActual: z.number().int().positive(),
  eyeContactGoodSec: z.number().int().nonnegative(),
  eyeContactBadSec: z.number().int().nonnegative(),
  fillerWordCount: z.number().int().nonnegative(),
  fillerWordTimestamps: z.array(
    z.object({
      word: z.string(),
      atSecond: z.number().nonnegative(),
    })
  ),
  avgWpm: z.number().nonnegative(),
  wpmSamples: z.array(
    z.object({
      atSecond: z.number().nonnegative(),
      wpm: z.number().nonnegative(),
    })
  ),
  postureFlags: z.array(
    z.object({
      type: z.enum(["slouch", "fidget", "passive_hands"]),
      atSecond: z.number().nonnegative(),
    })
  ),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;
