// 이미지 업로드 보안 및 검증 유틸리티

import { ImagePickerResponse, Asset } from 'react-native-image-picker';

/**
 * 허용된 이미지 MIME 타입
 */
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

/**
 * 허용된 이미지 확장자
 */
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * 최대 이미지 크기 (5MB)
 */
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * 이미지 파일 검증 결과 타입
 */
export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
  asset?: Asset;
}

/**
 * 이미지 파일 검증
 */
export const validateImage = (response: ImagePickerResponse): ImageValidationResult => {
  // 취소된 경우
  if (response.didCancel) {
    return {
      isValid: false,
      error: '이미지 선택이 취소되었습니다.',
    };
  }

  // 에러 발생
  if (response.errorCode) {
    let errorMessage = '이미지를 선택할 수 없습니다.';
    switch (response.errorCode) {
      case 'camera_unavailable':
        errorMessage = '카메라를 사용할 수 없습니다.';
        break;
      case 'permission':
        errorMessage = '카메라 또는 갤러리 접근 권한이 필요합니다.';
        break;
      case 'others':
        errorMessage = response.errorMessage || errorMessage;
        break;
    }
    return {
      isValid: false,
      error: errorMessage,
    };
  }

  // 에셋이 없는 경우
  if (!response.assets || response.assets.length === 0) {
    return {
      isValid: false,
      error: '이미지를 선택해주세요.',
    };
  }

  const asset = response.assets[0];

  // 파일 크기 검증
  if (asset.fileSize && asset.fileSize > MAX_IMAGE_SIZE) {
    return {
      isValid: false,
      error: `이미지 크기는 ${MAX_IMAGE_SIZE / 1024 / 1024}MB 이하여야 합니다.`,
    };
  }

  // 파일 타입 검증
  if (asset.type && !ALLOWED_IMAGE_TYPES.includes(asset.type)) {
    return {
      isValid: false,
      error: '지원하지 않는 이미지 형식입니다. (JPG, PNG, WEBP만 가능)',
    };
  }

  // URI가 없는 경우
  if (!asset.uri) {
    return {
      isValid: false,
      error: '이미지 URI를 가져올 수 없습니다.',
    };
  }

  // 확장자 검증 (URI에서)
  const uri = asset.uri.toLowerCase();
  const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => uri.endsWith(ext));
  if (!hasValidExtension) {
    return {
      isValid: false,
      error: '지원하지 않는 이미지 확장자입니다.',
    };
  }

  return {
    isValid: true,
    asset,
  };
};

/**
 * 이미지 크기 제한 (픽셀)
 */
export const validateImageDimensions = (
  width: number | undefined,
  height: number | undefined,
  maxWidth: number = 4000,
  maxHeight: number = 4000
): ImageValidationResult => {
  if (!width || !height) {
    return {
      isValid: true, // 크기 정보가 없으면 통과 (선택적 검증)
    };
  }

  if (width > maxWidth || height > maxHeight) {
    return {
      isValid: false,
      error: `이미지 크기는 ${maxWidth}x${maxHeight} 픽셀 이하여야 합니다.`,
    };
  }

  return {
    isValid: true,
  };
};

