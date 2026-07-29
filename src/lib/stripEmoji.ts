/**
 * Strips emoji characters from text to enforce the design system rule
 * of no emoji in the UI. Applied as safeguard on all Gemini AI responses.
 */
export function stripEmoji(text: string): string {
  return text
    .replace(
      /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F000}-\u{1FAFF}]|[\u{200D}]|[\u{20E3}]|[\u{E0020}-\u{E007F}]|[\u{2702}-\u{27B0}]|[\u{1F680}-\u{1F6FF}]|[\u{2500}-\u{2BEF}]|[\u{23CF}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2702}-\u{27B0}]/gu,
      ""
    )
    .replace(/\s{2,}/g, " ")
    .trim();
}
