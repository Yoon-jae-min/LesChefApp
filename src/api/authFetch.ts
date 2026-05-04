import { getAccessToken } from './tokenStorage';
import { refreshTokens } from './auth/refresh';

export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const doFetch = async (token: string | null) => {
    const headers = new Headers(init.headers as any);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return fetch(input, { ...init, headers });
  };

  let res = await doFetch(await getAccessToken());
  if (res.status !== 401) return res;

  const refreshed = await refreshTokens();
  if (!refreshed?.accessToken) return res;
  return doFetch(refreshed.accessToken);
}
