import { API_CONFIG } from '../../config/apiConfig';
import { getRefreshToken, clearTokens } from '../tokenStorage';

const API_BASE_URL = API_CONFIG.CUSTOMER_API;

export const logout = async (): Promise<Response> => {
  try {
    const refreshToken = await getRefreshToken();
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'GET',
      headers: refreshToken ? { 'X-Refresh-Token': refreshToken } : undefined,
    });

    if (!response.ok) {
      let errorMessage = `로그아웃 실패: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        const text = await response.text();
        errorMessage = text || errorMessage;
      }
      throw new Error(errorMessage);
    }

    await clearTokens();
    return response;
  } catch (error) {
    await clearTokens();
    if (error instanceof Error) throw error;
    throw new Error('로그아웃 중 네트워크 오류가 발생했습니다.');
  }
};
