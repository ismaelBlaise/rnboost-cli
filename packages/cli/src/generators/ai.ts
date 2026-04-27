import { createOpenAIClient, getApiKeyFromEnv } from '../ai/openai.js';
import { extractCodeBlock } from '../ai/codeBlock.js';

export type ArtifactKind = 'screen' | 'component' | 'hook' | 'store' | 'service';

const SYSTEM_PROMPTS: Record<ArtifactKind, string> = {
  screen: `You are a senior React Native engineer. Generate ONE complete, production-ready React Native screen component.
Rules: TypeScript, default-exported function component, StyleSheet.create, react-native primitives only,
hooks for state, accessibilityLabel on interactive elements. Output ONLY a single fenced \`\`\`tsx code block.`,

  component: `You are a senior React Native engineer. Generate ONE reusable React Native component.
Rules: TypeScript, default-exported function component, StyleSheet.create, exported Props interface,
react-native primitives only. Output ONLY a single fenced \`\`\`tsx code block.`,

  hook: `You are a senior React Native engineer. Generate ONE custom React hook.
Rules: TypeScript, named export starting with "use", uses standard React hooks (useState, useEffect, useCallback),
no React Native UI imports. Output ONLY a single fenced \`\`\`ts code block.`,

  store: `You are a senior React Native engineer. Generate ONE Zustand store.
Rules: TypeScript, exported \`use*Store\` hook, exported State interface, action methods on the state.
Output ONLY a single fenced \`\`\`ts code block.`,

  service: `You are a senior React Native engineer. Generate ONE API service module.
Rules: TypeScript, named exports for each operation (list/get/create/update/delete as relevant),
imports an \`api()\` helper from './api', exported entity interface. Output ONLY a single fenced \`\`\`ts code block.`,
};

export interface GenerateWithAIOptions {
  kind: ArtifactKind;
  name: string;
  prompt: string;
  model: string;
}

export async function generateWithAI(opts: GenerateWithAIOptions): Promise<string> {
  const apiKey = getApiKeyFromEnv();
  const client = createOpenAIClient(apiKey);

  const userPrompt = [
    `Name: ${opts.name}`,
    `Description: ${opts.prompt}`,
    '',
    'Generate the file contents.',
  ].join('\n');

  const raw = await client.chat({
    model: opts.model,
    system: SYSTEM_PROMPTS[opts.kind],
    user: userPrompt,
  });

  return extractCodeBlock(raw);
}
