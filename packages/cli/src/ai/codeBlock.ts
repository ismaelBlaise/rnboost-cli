const FENCE_RE = /```(?:tsx?|jsx?|typescript|javascript)?\n([\s\S]*?)```/i;

export function extractCodeBlock(raw: string): string {
  const match = raw.match(FENCE_RE);
  if (match && match[1]) return match[1].trim();
  return raw.trim();
}
