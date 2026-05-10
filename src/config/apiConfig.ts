import { Platform } from 'react-native';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 백엔드 주소 (가장 먼저 확인할 곳)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * USB로 실물 폰 + 디버그 빌드(`__DEV__ === true`)에서도 **Render**를 쓰려면
 * 아래에 Render HTTPS 주소만 넣으면 됩니다. (끝의 `/` 없이)
 *   예: 'https://leschef-api.onrender.com'
 *
 * 비워 두면:
 *   - 개발 모드: PC 로컬 API (에뮬레이터 10.0.2.2 / iOS 시뮬레이터 localhost)
 *   - 릴리스: RELEASE_BACKEND_URL
 */
const REMOTE_BACKEND_URL = 'https://leschef.onrender.com';

/** 스토어 릴리스 APK/AAB (REMOTE 비었을 때만 사용) */
const RELEASE_BACKEND_URL = 'https://api.leschef.com';

/** 로컬 백엔드 (REMOTE 비었고 `__DEV__`일 때만) */
const LOCAL_DEV_BASE =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://localhost:3001';

function resolveBaseUrl(): string {
  const remote = REMOTE_BACKEND_URL.trim().replace(/\/$/, '');
  if (remote.length > 0) {
    return remote;
  }
  if (__DEV__) {
    return LOCAL_DEV_BASE;
  }
  return RELEASE_BACKEND_URL;
}

const BASE_URL = resolveBaseUrl();

export const API_CONFIG = {
  BASE_URL,
  RECIPE_API: `${BASE_URL}/recipe`,
  BOARD_API: `${BASE_URL}/board`,
  CUSTOMER_API: `${BASE_URL}/customer`,
  FOODS_API: `${BASE_URL}/foods`,
} as const;

/** 웹과 동일한 OAuth 리다이렉트(백엔드). 앱에서는 브라우저로 열어 처리합니다. */
export const KAKAO_CONFIG = {
  REST_API_KEY: '27686de4626adc4c281dfae610633baf', // 필요 시 빌드 설정으로 주입
  AUTH_URL: 'https://kauth.kakao.com/oauth/authorize',
  REDIRECT_URI: `${BASE_URL}/customer/kakaoLogin`,
} as const;

export const GOOGLE_CONFIG = {
  CLIENT_ID: '399800693722-5j3ih6au8l6c68ilok932sbp6u5q466g.apps.googleusercontent.com',
  AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
  REDIRECT_URI: `${API_CONFIG.BASE_URL}/customer/googleLogin`,
  SCOPE: 'openid email profile',
} as const;

export const NAVER_CONFIG = {
  CLIENT_ID: 'zIdg_ZgETYWKN4RQqD0h',
  AUTH_URL: 'https://nid.naver.com/oauth2.0/authorize',
  REDIRECT_URI: `${API_CONFIG.BASE_URL}/customer/naverLogin`,
  STATE_LOGIN: 'leschef_naver_login',
  STATE_LINK: 'leschef_naver_link',
} as const;

function toQueryString(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

function getOAuthState(mode: 'login' | 'link', appLinkToken?: string): string {
  if (appLinkToken) {
    return `app_link:${appLinkToken}`;
  }
  return mode === 'link' ? 'link' : 'app_login';
}

export function getKakaoLoginUrl(mode: 'login' | 'link' = 'login', appLinkToken?: string): string {
  if (!KAKAO_CONFIG.REST_API_KEY) {
    throw new Error('카카오 REST API 키가 설정되지 않았습니다.');
  }
  const params = toQueryString({
    client_id: KAKAO_CONFIG.REST_API_KEY,
    redirect_uri: KAKAO_CONFIG.REDIRECT_URI,
    response_type: 'code',
    state: getOAuthState(mode, appLinkToken),
  });
  return `${KAKAO_CONFIG.AUTH_URL}?${params}`;
}

export function getGoogleLoginUrl(mode: 'login' | 'link' = 'login', appLinkToken?: string): string {
  if (!GOOGLE_CONFIG.CLIENT_ID) {
    throw new Error('구글 클라이언트 ID가 설정되지 않았습니다.');
  }
  const params = toQueryString({
    client_id: GOOGLE_CONFIG.CLIENT_ID,
    redirect_uri: GOOGLE_CONFIG.REDIRECT_URI,
    response_type: 'code',
    scope: GOOGLE_CONFIG.SCOPE,
    access_type: 'offline',
    prompt: 'consent',
    state: getOAuthState(mode, appLinkToken),
  });
  return `${GOOGLE_CONFIG.AUTH_URL}?${params}`;
}

export function getNaverLoginUrl(mode: 'login' | 'link' = 'login', appLinkToken?: string): string {
  if (!NAVER_CONFIG.CLIENT_ID) {
    throw new Error('네이버 클라이언트 ID가 설정되지 않았습니다.');
  }
  const params = toQueryString({
    response_type: 'code',
    client_id: NAVER_CONFIG.CLIENT_ID,
    redirect_uri: NAVER_CONFIG.REDIRECT_URI,
    state: appLinkToken
      ? `app_link:${appLinkToken}`
      : mode === 'link'
        ? NAVER_CONFIG.STATE_LINK
        : 'app_login',
  });
  return `${NAVER_CONFIG.AUTH_URL}?${params}`;
}
