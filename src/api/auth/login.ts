import { API_CONFIG } from '../../config/apiConfig';
import type { LoginData, LoginResponse } from './types';
import { setTokens } from '../tokenStorage';

const API_BASE_URL = API_CONFIG.CUSTOMER_API;

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const { customerId, customerPwd } = data;
  if (!customerId || !customerPwd) {
    throw new Error('아이디와 비밀번호를 입력해주세요.');
  }

  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId, customerPwd }),
  });

  if (!response.ok) {
    let errorMessage = `로그인 실패: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      const text = await response.text();
      errorMessage = text || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const result: LoginResponse & { accessToken?: string; refreshToken?: string } = await response.json();
  if (result.accessToken && result.refreshToken) {
    await setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken });
  }
  return result;
};
