export interface ApiError {
  error: true;
  message: string;
  details?:
    | string
    | string[]
    | Array<{ field: string; fieldName?: string; message: string; value?: unknown }>;
  field?: string;
  fieldName?: string;
  value?: unknown;
  duplicateValue?: unknown;
  path?: string;
  maxSize?: number;
  maxSizeMB?: number;
  maxCount?: number;
  stack?: string;
  originalError?: string;
}

export function getStatusMessage(status: number): string {
  const messages: Record<number, string> = {
    400: '잘못된 요청입니다.',
    401: '로그인이 필요합니다.',
    403: '접근 권한이 없습니다.',
    404: '요청한 정보를 찾을 수 없습니다.',
    409: '이미 존재하는 정보입니다.',
    413: '요청 크기가 너무 큽니다.',
    422: '처리할 수 없는 요청입니다.',
    429: '요청 횟수가 너무 많습니다. 잠시 후 다시 시도해주세요.',
    500: '서버 오류가 발생했습니다.',
    503: '서비스를 일시적으로 사용할 수 없습니다.',
  };
  return messages[status] || '오류가 발생했습니다.';
}

export function formatErrorMessage(error: ApiError | Error | unknown): string {
  if (typeof error === 'object' && error !== null && 'error' in error) {
    const apiError = error as ApiError;
    if (apiError.details && Array.isArray(apiError.details) && apiError.details.length > 0) {
      const first = apiError.details[0];
      if (typeof first === 'object' && first !== null && 'message' in first) {
        return String((first as { message: string }).message);
      }
    }
    if (apiError.fieldName && apiError.message) {
      return apiError.message;
    }
    return apiError.message || '오류가 발생했습니다.';
  }
  if (error instanceof Error) {
    return error.message || '오류가 발생했습니다.';
  }
  return '오류가 발생했습니다.';
}

export async function handleApiError(response: Response): Promise<Error> {
  let errorData: ApiError | null = null;
  try {
    errorData = (await response.json()) as ApiError;
  } catch {
    try {
      const text = await response.text();
      return new Error(text || getStatusMessage(response.status));
    } catch {
      return new Error(getStatusMessage(response.status));
    }
  }
  if (errorData && 'error' in errorData && errorData.error) {
    return new Error(formatErrorMessage(errorData));
  }
  return new Error(getStatusMessage(response.status));
}
