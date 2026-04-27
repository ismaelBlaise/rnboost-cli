import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createOpenAIClient, getApiKeyFromEnv } from '../ai/openai.js';
import { extractCodeBlock } from '../ai/codeBlock.js';

const SYSTEM_PROMPT = `You are a senior React Native engineer.
Generate ONE complete, production-ready React Native screen component.

Rules:
- TypeScript + React Native (no web-only APIs)
- Default export the component as a function component
- Use StyleSheet.create — no inline objects
- Use only react-native primitives + react if possible
- Use hooks (useState, useEffect) when state is needed
- Reasonable accessibility (accessibilityLabel on interactive elements)
- Output ONLY a single fenced \`\`\`tsx code block. No prose.`;

export interface GenerateScreenOptions {
  prompt: string;
  outDir: string;
  model: string;
  componentName: string;
}

export async function generateScreen(opts: GenerateScreenOptions): Promise<string> {
  const apiKey = getApiKeyFromEnv();
  const client = createOpenAIClient(apiKey);

  const userPrompt = [
    `Component name: ${opts.componentName}`,
    `Description: ${opts.prompt}`,
    '',
    'Generate the file contents. The default export must be the component.',
  ].join('\n');

  const raw = await client.chat({
    model: opts.model,
    system: SYSTEM_PROMPT,
    user: userPrompt,
  });

  const code = extractCodeBlock(raw);
  const targetDir = resolve(process.cwd(), opts.outDir);
  if (!existsSync(targetDir)) await mkdir(targetDir, { recursive: true });

  const filePath = resolve(targetDir, `${opts.componentName}.tsx`);
  if (existsSync(filePath)) {
    throw new Error(`File already exists: ${filePath}`);
  }
  await writeFile(filePath, `${code}\n`, 'utf8');
  return filePath;
}
