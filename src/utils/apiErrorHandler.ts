// API 에러 처리 유틸리티

/**
 * API 에러 타입
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * 네트워크 에러인지 확인
 */
export const isNetworkError = (error: any): boolean => {
  return (
    error?.message?.includes('Network request failed') ||
    error?.message?.includes('network') ||
    error?.message?.includes('NetworkError') ||
    error?.code === 'NETWORK_ERROR' ||
    error?.name === 'NetworkError'
  );
};

/**
 * API 에러를 사용자 친화적인 메시지로 변환
 */
export const formatApiError = (error: any): string => {
  // 네트워크 에러
  if (isNetworkError(error)) {
    return '네트워크 연결을 확인해주세요.';
  }

  // HTTP 상태 코드 기반 에러
  if (error?.response) {
    const status = error.response.status;
    switch (status) {
      case 400:
        return error.response.data?.message || '잘못된 요청입니다.';
      case 401:
        return '로그인이 필요합니다.';
      case 403:
        return '접근 권한이 없습니다.';
      case 404:
        return '요청한 리소스를 찾을 수 없습니다.';
      case 409:
        return error.response.data?.message || '이미 존재하는 데이터입니다.';
      case 413:
        return '파일 크기가 너무 큽니다.';
      case 422:
        return error.response.data?.message || '입력 데이터를 확인해주세요.';
      case 429:
        return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
      case 500:
        return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      case 503:
        return '서비스를 일시적으로 사용할 수 없습니다.';
      default:
        return error.response.data?.message || `오류가 발생했습니다. (${status})`;
    }
  }

  // 일반 에러 메시지
  if (error?.message) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
};

/**
 * API 호출 래퍼 (에러 처리 포함)
 */
export const apiCall = async <T>(
  apiFunction: () => Promise<T>,
  onError?: (error: string) => void
): Promise<T | null> => {
  try {
    return await apiFunction();
  } catch (error: any) {
    const errorMessage = formatApiError(error);
    console.error('API Error:', error);
    
    if (onError) {
      onError(errorMessage);
    } else {
      // 기본 에러 처리 (Toast 메시지 등)
      console.error('API Error:', errorMessage);
    }
    
    return null;
  }
};

