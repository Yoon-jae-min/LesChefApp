import { API_CONFIG } from '../../config/apiConfig';
import type { ToggleWishResponse } from '../../types/apiRecipe';
import { authFetch } from '../authFetch';

const API_BASE_URL = API_CONFIG.RECIPE_API;

export const toggleRecipeWish = async (recipeId: string): Promise<ToggleWishResponse> => {
  if (!recipeId) throw new Error('레시피 ID가 필요합니다.');
  const response = await authFetch(`${API_BASE_URL}/clickwish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipeId }),
  });
  if (!response.ok) {
    let errorMessage = `찜 요청 실패: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      const text = await response.text();
      errorMessage = text || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return response.json();
};
