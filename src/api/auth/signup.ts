import { API_CONFIG } from '../../config/apiConfig';
import type { SignupData } from './types';

const API_BASE_URL = API_CONFIG.CUSTOMER_API;

export const signup = async (data: SignupData): Promise<Response> => {
  const { id, email, pwd, name, nickName, tel } = data;
  if (!id || !email || !pwd || !nickName) {
    throw new Error('아이디, 이메일, 비밀번호, 닉네임은 필수입니다.');
  }

  const response = await fetch(`${API_BASE_URL}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      email,
      pwd,
      name: name || 'user',
      nickName,
      tel: tel || '',
    }),
  });

  if (!response.ok) {
    let errorMessage = `회원가입 실패: ${response.status}`;
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

export const checkIdDuplicate = async (id: string): Promise<string> => {
  if (!id) throw new Error('아이디를 입력해주세요.');
  const response = await fetch(`${API_BASE_URL}/check?id=${encodeURIComponent(id)}`, {
    method: 'GET',
  });
  const bodyText = await response.text();
  if (!response.ok) {
    let errorMessage = `아이디 중복 확인 실패: ${response.status}`;
    try {
      const errJson = JSON.parse(bodyText) as { message?: string };
      if (errJson.message) errorMessage = errJson.message;
    } catch {
      if (bodyText) errorMessage = bodyText;
    }
    throw new Error(errorMessage);
  }
  return bodyText;
};

export const sendVerificationCode = async (email: string): Promise<Response> => {
  if (!email) throw new Error('이메일을 입력해주세요.');
  const response = await fetch(`${API_BASE_URL}/sendVerificationCode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    let errorMessage = `인증 코드 발송 실패: ${response.status}`;
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

export const verifyEmailCode = async (email: string, code: string): Promise<Response> => {
  if (!email || !code) throw new Error('이메일과 인증 코드를 입력해주세요.');
  const response = await fetch(`${API_BASE_URL}/verifyEmailCode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });
  if (!response.ok) {
    let errorMessage = `인증 코드 검증 실패: ${response.status}`;
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
