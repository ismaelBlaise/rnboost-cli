const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com';

export interface ApiError {
  status: number;
  message: string;
}

export async function api<T>(
  path: string,
  init: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, headers, ...rest } = init;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw { status: res.status, message: text || res.statusText } satisfies ApiError;
  }

  return (await res.json()) as T;
}
