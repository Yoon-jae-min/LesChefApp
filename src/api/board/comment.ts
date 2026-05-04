import { API_CONFIG } from '../../config/apiConfig';
import { authFetch } from '../authFetch';

const API_BASE_URL = API_CONFIG.BOARD_API;

export const createBoardComment = async (data: {
  boardId: string;
  content: string;
}): Promise<Response> => {
  const { boardId, content } = data;
  if (!boardId || !content) throw new Error('게시글 ID와 댓글 내용은 필수입니다.');

  const response = await authFetch(`${API_BASE_URL}/commentWrite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ boardId, content }),
  });
  if (!response.ok) {
    let errorMessage = `댓글 작성 실패: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      const text = await response.text();
      errorMessage = text || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return response;
};
