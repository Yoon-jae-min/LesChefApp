import { API_CONFIG } from '../../config/apiConfig';
import { authFetch } from '../authFetch';
import { handleApiError } from '../error/apiErrorTypes';
import type {
  RecipeListParams,
  RecipeListResponse,
  RecipeDetailResponse,
  MyRecipeListResponse,
  WishRecipeListResponse,
  RecipeDetailApiBody,
} from '../../types/apiRecipe';

const API_BASE_URL = API_CONFIG.RECIPE_API;

export const fetchRecipeList = async (params: RecipeListParams = {}): Promise<RecipeListResponse> => {
  const query = new URLSearchParams();
  if (params.category) query.set('category', params.category);
  if (params.subCategory) query.set('subCategory', params.subCategory);
  if (typeof params.isShare !== 'undefined') query.set('isShare', String(params.isShare));
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.sort) query.set('sort', params.sort);
  if (params.keyword) query.set('keyword', params.keyword);
  if (params.tag) query.set('tag', params.tag);

  const response = await fetch(`${API_BASE_URL}/list?${query.toString()}`, { method: 'GET' });
  if (!response.ok) {
    throw await handleApiError(response);
  }
  return response.json();
};

export const fetchRecipeDetailById = async (recipeId: string): Promise<RecipeDetailResponse> => {
  if (!recipeId) throw new Error('레시피 ID가 필요합니다.');
  const response = await fetch(`${API_BASE_URL}/info?id=${encodeURIComponent(recipeId)}`, {
    method: 'GET',
  });
  if (!response.ok) {
    let errorMessage = `레시피 상세 조회 실패: ${response.status}`;
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

export const fetchRecipeForEdit = async (recipeId: string): Promise<RecipeDetailResponse> => {
  if (!recipeId) throw new Error('레시피 ID가 필요합니다.');
  const response = await authFetch(
    `${API_BASE_URL}/info?id=${encodeURIComponent(recipeId)}&forEdit=1`,
    { method: 'GET' },
  );
  if (!response.ok) {
    throw await handleApiError(response);
  }
  const body = (await response.json()) as RecipeDetailApiBody;
  if (body.error === true) {
    throw new Error(body.message || '레시피를 불러올 수 없습니다.');
  }
  return body;
};

export const fetchMyRecipeList = async (): Promise<MyRecipeListResponse> => {
  const response = await authFetch(`${API_BASE_URL}/myList`, { method: 'GET' });
  if (!response.ok) {
    let errorMessage = `나의 레시피 조회 실패: ${response.status}`;
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

export const fetchWishRecipeList = async (): Promise<WishRecipeListResponse> => {
  const response = await authFetch(`${API_BASE_URL}/wishList`, { method: 'GET' });
  if (!response.ok) {
    let errorMessage = `찜한 레시피 조회 실패: ${response.status}`;
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
