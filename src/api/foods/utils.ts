import { authFetch } from '../authFetch';

export async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await authFetch(url, {
    ...options,
    headers: { ...(options.headers || {}) },
  });
  if (!response.ok) {
    let errorMessage = `요청 실패: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorData?.error || errorMessage;
    } catch {
      try {
        const text = await response.text();
        errorMessage = text || errorMessage;
      } catch {
        /* ignore */
      }
    }
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
}
