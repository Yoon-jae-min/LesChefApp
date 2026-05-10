import { API_CONFIG } from '../../config/apiConfig';
import { authFetch } from '../authFetch';

export type SocialProvider = 'kakao' | 'google' | 'naver';

const API_BASE_URL = API_CONFIG.CUSTOMER_API;

export const unlinkSocial = async (provider: SocialProvider): Promise<void> => {
  const response = await authFetch(`${API_BASE_URL}/unlink/${provider}`, {
    method: 'POST',
  });

  if (!response.ok) {
    let errorMessage = `연동 해제 실패: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      const text = await response.text();
      errorMessage = text || errorMessage;
    }
    throw new Error(errorMessage);
  }
};
