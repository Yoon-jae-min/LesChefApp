// 이미지 리소스 상수 파일
// 모든 이미지를 import로 관리하여 require 제거

export const Images = {
  // 공통 아이콘
  back: require('./image/back.png'),
  upload: require('./image/upload.png'),
  write: require('./image/write.png'),
  search: require('./image/search.png'),
  profile: require('./image/profile.png'),
  delete: require('./image/delete.png'),
  cancel_BK: require('./image/cancel_BK.png'),
  cancel_DG: require('./image/cancel_DG.png'),
  cancel_WT: require('./image/cancel_WT.png'),
  ok_BK: require('./image/ok_BK.png'),
  
  // 화살표
  leftArrow: require('./image/leftArrow.png'),
  rightArrow: require('./image/rightArrow.png'),
  
  // 좋아요/추천
  like: require('./image/like.png'),
  unlike: require('./image/unlike.png'),
  thumb: require('./image/thumb.png'),
  
  // 이미지 선택
  camera: require('./image/camera.png'),
  gallery: require('./image/gallery.png'),
  addImg: require('./image/addImg.png'),
  addUnit: require('./image/addUnit.png'),
  remove: require('./image/remove.png'),
  
  // 텍스트 정렬
  textAlignLeft: require('./image/textAlignLeft.png'),
  textAlignCenter: require('./image/textAlignCenter.png'),
  textAlignRight: require('./image/textAlignRight.png'),
  
  // 기타
  noImage: require('./image/noImage.png'),
  time: require('./image/time.png'),
  viewCount: require('./image/viewCount.png'),
  LesChef_Logo: require('./image/LesChef_Logo.png'),
  
  // 레시피 이미지
  참치김치찌개: require('./image/참치김치찌개.jpg'),
} as const;

// 타입 안정성을 위한 타입 정의
export type ImageKey = keyof typeof Images;

