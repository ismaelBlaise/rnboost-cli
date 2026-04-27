export function toPascalCase(input: string): string {
  return input
    .replace(/[^a-zA-Z0-9 _-]/g, ' ')
    .split(/[ _-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

export function ensureScreenName(prompt: string, fallback = 'GeneratedScreen'): string {
  const firstWords = prompt.split(/\s+/).slice(0, 3).join(' ');
  const pascal = toPascalCase(firstWords);
  if (!pascal) return fallback;
  return pascal.endsWith('Screen') ? pascal : `${pascal}Screen`;
}
