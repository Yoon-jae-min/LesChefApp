import { API_CONFIG } from '../../config/apiConfig';
import { fetchJson } from './utils';
import type { FoodsListResponse } from './types';

const API_BASE_URL = API_CONFIG.FOODS_API;

export const fetchFoodsList = (): Promise<FoodsListResponse> =>
  fetchJson<FoodsListResponse>(`${API_BASE_URL}/place`, { method: 'GET' });

export const addStoragePlace = (placeName: string): Promise<FoodsListResponse> => {
  if (!placeName?.trim()) throw new Error('보관 장소 이름을 입력해주세요.');
  return fetchJson<FoodsListResponse>(`${API_BASE_URL}/place`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ placeName }),
  });
};

export const updateStoragePlace = (placeId: string, changeName: string): Promise<FoodsListResponse> => {
  if (!placeId || !changeName?.trim()) throw new Error('장소 ID와 변경할 이름이 필요합니다.');
  return fetchJson<FoodsListResponse>(`${API_BASE_URL}/place`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ placeId, changeName: changeName.trim() }),
  });
};

export const deleteStoragePlace = (placeId: string): Promise<FoodsListResponse> => {
  if (!placeId) throw new Error('보관 장소 ID가 필요합니다.');
  return fetchJson<FoodsListResponse>(`${API_BASE_URL}/place`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ placeId }),
  });
};
