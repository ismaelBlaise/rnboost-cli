import { api } from './api';

interface LoginResponse {
  token: string;
  user: { id: string; email: string };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  return api<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function register(email: string, password: string): Promise<LoginResponse> {
  return api<LoginResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function me(token: string): Promise<LoginResponse['user']> {
  return api<LoginResponse['user']>('/auth/me', { token });
}
