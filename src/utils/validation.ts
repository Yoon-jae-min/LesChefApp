// 입력 검증 유틸리티 함수

/**
 * 텍스트 입력 검증
 */
export const validateText = {
  /**
   * 필수 입력 검증
   */
  required: (value: string | null | undefined, fieldName: string): string | null => {
    if (!value || value.trim().length === 0) {
      return `${fieldName}을(를) 입력해주세요.`;
    }
    return null;
  },

  /**
   * 최소 길이 검증
   */
  minLength: (value: string, min: number, fieldName: string): string | null => {
    if (value.length < min) {
      return `${fieldName}은(는) 최소 ${min}자 이상이어야 합니다.`;
    }
    return null;
  },

  /**
   * 최대 길이 검증
   */
  maxLength: (value: string, max: number, fieldName: string): string | null => {
    if (value.length > max) {
      return `${fieldName}은(는) 최대 ${max}자까지 입력 가능합니다.`;
    }
    return null;
  },

  /**
   * 이메일 형식 검증
   */
  email: (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return '올바른 이메일 형식이 아닙니다.';
    }
    return null;
  },

  /**
   * 숫자 범위 검증
   */
  numberRange: (value: string | number, min: number, max: number, fieldName: string): string | null => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) {
      return `${fieldName}은(는) 숫자여야 합니다.`;
    }
    if (num < min || num > max) {
      return `${fieldName}은(는) ${min} 이상 ${max} 이하여야 합니다.`;
    }
    return null;
  },

  /**
   * 양수 검증
   */
  positive: (value: string | number, fieldName: string): string | null => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num) || num <= 0) {
      return `${fieldName}은(는) 0보다 큰 숫자여야 합니다.`;
    }
    return null;
  },
};

/**
 * HTML 태그 제거 (XSS 방지)
 */
export const sanitizeText = (text: string): string => {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * 특수 문자 제거 (필요시)
 */
export const removeSpecialChars = (text: string, allowedChars?: string[]): string => {
  let pattern = /[^a-zA-Z0-9가-힣\s]/g;
  if (allowedChars && allowedChars.length > 0) {
    const allowed = allowedChars.join('');
    pattern = new RegExp(`[^a-zA-Z0-9가-힣\\s${allowed}]`, 'g');
  }
  return text.replace(pattern, '');
};

