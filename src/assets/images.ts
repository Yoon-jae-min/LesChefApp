// 이미지 리소스 상수 파일
// 모든 이미지를 import로 관리하여 require 제거

export const Images = {
  LesChef_AppIconMark: require('./image/LesChef_AppIconMark.png'),
  LesChef_SplashLogo: require('./image/LesChef_SplashLogo.png'),
} as const;

export type ImageKey = keyof typeof Images;
