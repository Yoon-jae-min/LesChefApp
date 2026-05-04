import { API_CONFIG } from '../config/apiConfig';
import { authFetch } from './authFetch';

export type IngredientPriceItem = {
  name: string;
  price: number;
  unit: string;
  change?: number;
  changeRate?: number;
  date?: string;
};

export type IngredientPriceResponse = {
  error: boolean;
  data: IngredientPriceItem[];
  date: string;
  message?: string;
};

export const getIngredientPrices = async (): Promise<IngredientPriceResponse> => {
  const response = await authFetch(`${API_CONFIG.BASE_URL}/ingredient-price`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    let errorMessage = `식재료 물가 정보 조회 실패: ${response.status}`;
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
