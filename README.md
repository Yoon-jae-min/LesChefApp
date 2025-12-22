# 📱 LesChef Mobile App

React Native 기반 모바일 애플리케이션

## 📋 개요

LesChef 모바일 앱은 React Native로 개발된 크로스 플랫폼 모바일 애플리케이션입니다. Android와 iOS에서 동일한 코드베이스로 실행되며, 웹 서비스와 동일한 백엔드 API를 사용합니다. 사용자들이 모바일에서 편리하게 레시피를 검색, 등록, 공유하고 커뮤니티에서 소통할 수 있는 기능을 제공합니다.

**디자인 통일**: 웹 서비스와 동일한 디자인 시스템을 사용하여 일관된 사용자 경험을 제공합니다.

## 🛠️ 기술 스택

- **Framework**: React Native 0.78
- **Language**: TypeScript 5
- **State Management**: 
  - Redux Toolkit (전역 상태)
  - React Context API (컴포넌트별 상태)
- **Navigation**: React Navigation 7 (Native Stack)
- **UI Components**: 
  - React Native 기본 컴포넌트
  - react-native-image-picker (이미지 선택)
  - react-native-dropdown-picker (드롭다운)
  - react-native-toast-message (토스트 알림)
  - react-native-actions-sheet (액션 시트)
  - react-native-picker-select (선택기)
  - react-native-reanimated (애니메이션)
  - react-native-gesture-handler (제스처 처리)

## 📁 프로젝트 구조

```
LesChefApp/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── common/          # 공통 컴포넌트
│   │   │   ├── menu/       # 메뉴 컴포넌트
│   │   │   ├── top/        # 상단 헤더
│   │   │   └── useElement/ # 공통 UI 요소
│   │   ├── recipe/         # 레시피 관련 컴포넌트
│   │   │   ├── info/       # 레시피 상세
│   │   │   └── list/       # 레시피 목록
│   │   ├── community/      # 커뮤니티 관련 컴포넌트
│   │   │   ├── info/       # 게시글 상세
│   │   │   ├── list/       # 게시글 목록
│   │   │   └── write/      # 게시글 작성
│   │   ├── myPage/         # 마이페이지 컴포넌트
│   │   │   ├── body/       # 본문 컴포넌트
│   │   │   ├── modal/      # 모달 컴포넌트
│   │   │   └── top/        # 상단 메뉴
│   │   └── main/           # 메인 페이지 컴포넌트
│   ├── context/            # React Context
│   │   ├── commonContext.tsx
│   │   ├── recipeContext.tsx
│   │   ├── communityContext.tsx
│   │   ├── myPageContext.tsx
│   │   ├── mainContext.tsx
│   │   └── dummyContext.tsx
│   ├── redux/              # Redux 상태 관리
│   │   ├── store.tsx       # Redux 스토어
│   │   ├── commonSlice.tsx
│   │   ├── recipeSlice.tsx
│   │   ├── communitySlice.tsx
│   │   └── storageSlice.tsx
│   ├── styles/             # 스타일 파일
│   │   ├── common/         # 공통 스타일
│   │   │   └── theme.tsx   # 디자인 시스템 (색상, 스페이싱, 그림자 등)
│   │   ├── recipe/         # 레시피 스타일
│   │   ├── community/      # 커뮤니티 스타일
│   │   ├── myPage/         # 마이페이지 스타일
│   │   └── main/           # 메인 스타일
│   ├── types/               # TypeScript 타입 정의
│   │   ├── recipeTypes.tsx
│   │   ├── boardTypes.tsx
│   │   ├── myPageTypes.tsx
│   │   ├── commonTypes.tsx
│   │   ├── mainTypes.tsx
│   │   └── navigateTypes.tsx
│   ├── hooks/               # 커스텀 훅
│   │   └── useCategory.tsx
│   ├── utils/               # 유틸리티 함수
│   │   ├── validation.ts    # 입력 검증
│   │   ├── imageValidation.ts # 이미지 검증
│   │   └── apiErrorHandler.ts # API 에러 처리
│   └── assets/             # 이미지 및 폰트
│       └── image/          # 이미지 파일
├── android/                # Android 네이티브 코드
├── ios/                    # iOS 네이티브 코드
└── App.tsx                 # 앱 진입점
```

## 🎯 주요 기능

### 레시피 기능
- 레시피 목록 조회 (카테고리별 필터링)
- 레시피 상세 정보 (재료, 조리 단계)
- 레시피 검색
- 레시피 등록 (이미지 업로드 포함)
- 레시피 수정 및 삭제
- 찜한 레시피 관리

### 커뮤니티 기능
- 게시글 목록 및 상세
- 게시글 작성, 수정, 삭제
- 댓글 작성 및 관리
- 좋아요 기능
- 게시글 검색

### 마이페이지 기능
- 사용자 정보 관리
- 프로필 수정
- 비밀번호 변경
- 내가 작성한 레시피 목록
- 찜한 레시피 목록
- 보관함 관리 (재료 추가/삭제)

### 메인 페이지
- 인기 레시피 소개
- 카테고리별 빠른 접근

## 🚀 개발 환경 설정

### 필수 요구사항
- Node.js 18 이상
- React Native CLI
- Android Studio (Android 개발)
- Xcode (iOS 개발, macOS만)
- Java Development Kit (JDK)

### 설치
```bash
npm install
```

### Android 개발
```bash
# Android Studio에서 에뮬레이터 실행 후
npm run android
```

또는 Android Studio에서 직접 프로젝트를 열어 실행할 수 있습니다:
1. Android Studio 실행
2. `File > Open` → `LesChefApp/android` 폴더 선택
3. 프로젝트 로드 후 Run 버튼 클릭

### iOS 개발 (macOS만)
```bash
# CocoaPods 설치 (최초 1회)
cd ios
bundle install
bundle exec pod install
cd ..

# iOS 시뮬레이터 실행
npm run ios
```

### Metro Bundler 실행
```bash
npm start
```

## 📱 네이티브 기능

### 이미지 선택
- `react-native-image-picker`를 사용하여 갤러리에서 이미지 선택
- 카메라로 사진 촬영
- 레시피 이미지 업로드

### 네비게이션
- React Navigation을 사용한 스택 네비게이션
- 화면 간 이동 및 파라미터 전달
- 뒤로가기 제스처 지원

### 상태 관리
- **Redux Toolkit**: 전역 상태 관리 (레시피, 커뮤니티, 보관함)
- **React Context**: 컴포넌트별 로컬 상태 관리
- 각 화면별 Context Provider 사용

### 애니메이션
- `react-native-reanimated`를 사용한 부드러운 애니메이션
- 제스처 기반 인터랙션

## 🔌 API 통신

웹 프론트엔드와 동일한 백엔드 API를 사용합니다:
- RESTful API
- JSON 데이터 형식
- 세션 기반 인증
- 이미지 업로드 (multipart/form-data)

### 에러 처리
- 네트워크 에러 감지 및 처리
- HTTP 상태 코드별 사용자 친화적 메시지
- `src/utils/apiErrorHandler.ts`에서 중앙 관리

## 🎨 UI/UX

### 디자인 원칙
- **웹과 통일된 디자인**: 웹 서비스와 동일한 색상 팔레트 및 디자인 시스템 사용
- 모바일 퍼스트 디자인
- 직관적인 네비게이션
- 터치 친화적인 인터페이스
- 일관된 스타일링

### 디자인 시스템
앱은 웹 서비스와 통일된 디자인 시스템을 사용합니다:
- **색상 팔레트**: 그라데이션 배경 (orange-50, yellow-50, red-50)
- **카드 디자인**: 둥근 모서리 (32px), 그림자 효과, 흰색 배경
- **공통 테마**: `src/styles/common/theme.tsx`에서 중앙 관리
  - 색상 상수 (colors)
  - 스페이싱 (spacing)
  - 둥근 모서리 (borderRadius)
  - 그림자 효과 (shadows)
  - 카드 스타일 (cardStyle)

### 컴포넌트 구조
- 재사용 가능한 컴포넌트 구조
- 스타일 파일 분리 (`.style.tsx`)
- 타입 안정성 (TypeScript)
- 공통 테마 시스템 활용

### 스타일링
- StyleSheet API 사용
- 컴포넌트별 스타일 파일 분리
- 공통 테마 시스템 (`theme.tsx`)을 통한 스타일 재사용
- 웹과 동일한 디자인 토큰 사용으로 일관성 유지

## 📦 빌드

### Android APK 빌드
```bash
cd android
./gradlew assembleRelease
```

생성된 APK는 `android/app/build/outputs/apk/release/` 폴더에 있습니다.

### iOS 빌드
Xcode에서 직접 빌드:
1. `ios/LesChefApp.xcworkspace` 파일 열기
2. Product > Archive
3. 배포 설정

## 🧪 테스트

```bash
npm test
```

Jest를 사용한 단위 테스트를 지원합니다.

## 🔧 개발 도구

### Metro Bundler
JavaScript 번들러:
```bash
npm start
```

### 디버깅
- React Native Debugger 사용 가능
- Chrome DevTools 지원
- Flipper 통합 (선택사항)

### 개발 메뉴
- **Android**: 
  - 에뮬레이터: `Ctrl + M` (Windows/Linux) 또는 `Cmd + M` (macOS)
  - 실제 기기: 기기를 흔들기
- **iOS**: 
  - 시뮬레이터: `Cmd + D`
  - 실제 기기: 기기를 흔들기

### 개발 메뉴 단축키
```bash
npm run devmenu  # Android 개발 메뉴 열기 (ADB 사용)
```

## 🐛 트러블슈팅

### Android 빌드 오류
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS CocoaPods 오류
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Metro 캐시 문제
```bash
npm start -- --reset-cache
```

### 네이티브 모듈 링크 문제
```bash
# Android
cd android && ./gradlew clean && cd ..

# iOS
cd ios && pod install && cd ..
```

### 포트 충돌
다른 프로세스가 8081 포트를 사용 중인 경우:
```bash
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8081 | xargs kill -9
```

## 🔒 보안 및 예외 처리

### 입력 검증
- **텍스트 검증**: 필수 입력, 길이 제한, 이메일 형식 등
- **숫자 검증**: 범위 검증, 양수 검증
- **XSS 방지**: 텍스트 Sanitization
- `src/utils/validation.ts`에서 중앙 관리

### 이미지 업로드 보안
- 파일 크기 제한 (최대 5MB)
- 파일 타입 검증 (JPG, PNG, WEBP만 허용)
- 확장자 검증
- 에러 처리 (권한, 카메라/갤러리 오류)
- `src/utils/imageValidation.ts`에서 중앙 관리

### 예외 처리
- 네트워크 에러 처리
- API 에러 메시지 포맷팅
- 사용자 친화적 에러 표시
- `src/utils/apiErrorHandler.ts`에서 중앙 관리

자세한 내용은 [SECURITY.md](./SECURITY.md)를 참고하세요.

## 📚 추가 리소스

- [React Native 문서](https://reactnative.dev/docs/getting-started)
- [React Navigation 문서](https://reactnavigation.org/docs/getting-started)
- [Redux Toolkit 문서](https://redux-toolkit.js.org/introduction/getting-started)
- [TypeScript 문서](https://www.typescriptlang.org/docs)
- [보안 가이드](./SECURITY.md)

## 🔄 업데이트

### 의존성 업데이트
```bash
npm update
```

### React Native 업그레이드
공식 업그레이드 가이드를 따르세요:
[React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/)

## 📝 라이선스

이 프로젝트는 개인/교육 목적으로 개발되었습니다.

