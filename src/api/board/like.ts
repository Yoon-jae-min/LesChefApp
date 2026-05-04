import { API_CONFIG } from '../../config/apiConfig';
import type { ToggleBoardLikeResponse } from './types';
import { authFetch } from '../authFetch';

const API_BASE_URL = API_CONFIG.BOARD_API;

export const toggleBoardLike = async (boardId: string): Promise<ToggleBoardLikeResponse> => {
  if (!boardId) throw new Error('게시글 ID가 필요합니다.');
  const response = await authFetch(`${API_BASE_URL}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ boardId }),
  });
  if (!response.ok) {
    let errorMessage = `좋아요 토글 실패: ${response.status}`;
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
