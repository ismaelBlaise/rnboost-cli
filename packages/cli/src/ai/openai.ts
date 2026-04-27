export interface OpenAIChatOptions {
  model: string;
  system: string;
  user: string;
  temperature?: number;
}

export interface OpenAIClient {
  chat(opts: OpenAIChatOptions): Promise<string>;
}

interface ChatCompletionResponse {
  choices: Array<{ message: { content: string | null } }>;
  error?: { message: string };
}

export function createOpenAIClient(apiKey: string): OpenAIClient {
  return {
    async chat({ model, system, user, temperature = 0.2 }) {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
        }),
      });

      const data = (await res.json()) as ChatCompletionResponse;
      if (!res.ok) {
        throw new Error(data.error?.message ?? `OpenAI request failed: ${res.status}`);
      }
      const content = data.choices[0]?.message.content;
      if (!content) throw new Error('OpenAI returned an empty response.');
      return content;
    },
  };
}

export function getApiKeyFromEnv(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error(
      'OPENAI_API_KEY is not set. Export it in your shell or add it to a .env file.',
    );
  }
  return key;
}
