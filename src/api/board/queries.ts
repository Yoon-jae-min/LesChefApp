import { API_CONFIG } from '../../config/apiConfig';
import type { BoardListParams, BoardListResponse, BoardDetailResponse } from './types';

const API_BASE_URL = API_CONFIG.BOARD_API;

export const fetchBoardList = async (params: BoardListParams = {}): Promise<BoardListResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.type) query.set('type', params.type);

  const response = await fetch(`${API_BASE_URL}/list?${query.toString()}`, { method: 'GET' });
  if (!response.ok) {
    let errorMessage = `게시글 리스트 조회 실패: ${response.status}`;
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

export const fetchBoardDetail = async (id: string): Promise<BoardDetailResponse> => {
  if (!id) throw new Error('게시글 ID가 필요합니다.');
  const response = await fetch(`${API_BASE_URL}/watch?id=${encodeURIComponent(id)}`, {
    method: 'GET',
  });
  if (!response.ok) {
    let errorMessage = `게시글 상세 조회 실패: ${response.status}`;
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
