# LesChef Mobile App

React Native 기반 LesChef 모바일 앱입니다. **웹 프론트엔드 없이** `les-chef-back`(REST API)과 통신합니다.

## 개요

- **플랫폼**: Android / iOS (React Native 단일 코드베이스)
- **백엔드**: LesChef 백엔드 API(예: Render 배포)만 필요합니다. Next.js 웹 앱은 앱 동작에 필수 아님.
- **UI**: 웹과 맞춘 테마 토큰(`src/styles/theme.ts`) + 모바일용 하단 탭·화면 구성

## 기술 스택

| 구분 | 버전/라이브러리 (참고) |
|------|-------------------------|
| React Native | 0.76.x |
| React | 18.3.x |
| TypeScript | 5.x |
| Navigation | React Navigation 7 — Bottom Tabs + Native Stack |
| 상태 | Redux Toolkit, 일부 Context |
| 저장소 | AsyncStorage (세션 플래그·JWT 등) |
| 기타 | Expo 패키지 일부 사용(`package.json` 참고) |

## 프로젝트 구조 (요약)

```
LesChefApp/
├── App.tsx                 # 진입점 · Redux · 네비게이션 컨테이너
├── src/
│   ├── api/                # 백엔드 REST 호출 (auth, board, recipe, foods, ingredientPrice 등)
│   ├── config/
│   │   └── apiConfig.ts    # ★ API 베이스 URL · OAuth 리다이렉트 조합
│   ├── constants/          # storage 키 등
│   ├── navigation/
│   │   └── RootNavigator.tsx  # 탭 + 스택 · 로그인/회원가입/기타 모달 스택
│   ├── lib/
│   │   └── session.ts      # 로그인 후 사용자 정보 저장 등
│   ├── components/         # 화면 단위 UI
│   │   ├── Auth/           # 로그인, 회원가입, 아이디/비밀번호 찾기
│   │   ├── Board/          # 게시판 목록·상세·작성·수정
│   │   ├── Home/
│   │   ├── ingredient/     # 식재료 물가
│   │   ├── myPage/         # 마이, 정보, 보관함, 알림 설정 등
│   │   ├── recipe/         # 레시피 목록·상세·작성·수정
│   │   └── common/         # Top, 탭 등
│   ├── styles/
│   │   └── theme.ts        # 색·간격·타이포 등 디자인 토큰
│   ├── utils/              # 알림 설정·유통기한 inbox 등
│   ├── redux/
│   ├── context/
│   ├── hooks/
│   ├── types/
│   └── assets/
├── android/
├── ios/
└── package.json
```

## 백엔드 API 주소 설정

**파일**: `src/config/apiConfig.ts`

| 변수 | 역할 |
|------|------|
| **`REMOTE_BACKEND_URL`** | 값이 있으면 **디버그/릴리즈 모두** 이 주소를 사용합니다. USB 실기기로 테스트하면서 **Render HTTPS**만 쓰려면 여기에 `https://xxx.onrender.com` 형태로 넣습니다. (끝 `/` 없음) |
| 비어 있음 + `__DEV__` | 로컬 백엔드: Android 에뮬레이터 `http://10.0.2.2:3001`, iOS 시뮬레이터 `http://localhost:3001` |
| 비어 있음 + 릴리즈 | `RELEASE_BACKEND_URL` (스토어 빌드용 기본값, 필요 시 수정) |

OAuth(카카오/구글/네이버)용 리다이렉트 URI는 이 파일의 `BASE_URL`을 기준으로 조합됩니다. SNS 콘솔·백엔드 환경 변수와 **동일한 공개 URL**이어야 합니다.

## 주요 기능 (앱 기준)

- **탭**: 홈 · 레시피 · 게시판 · 마이
- **인증**: 이메일 로그인/회원가입, 아이디·비밀번호 찾기, 로그아웃 · JWT 저장 및 갱신(`authFetch`)
- **레시피**: 목록·상세·찜, 간단 작성/수정 화면(API 연동)
- **게시판**: 목록·상세·댓글·좋아요·글 작성/수정
- **마이**: 내 정보, 보관함 UI, 내 레시피·찜 목록, 알림 설정·유통기한 알림 기록(로컬 설정)
- **홈**: 식재료 물가 영역에서 물가 화면 이동
- **SNS 로그인**: 로그인 화면에서 브라우저로 OAuth URL 오픈 — **백엔드에 SNS 콜백 라우트가 있어야** 하며, 앱으로 자동 로그인까지 하려면 딥링크 등 추가 작업이 필요할 수 있음

일부 화면은 웹과 동일한 수준의 폼/기능이 아닐 수 있습니다(예: 레시피 작성 폼 단순화, 보관함과 백엔드 연동 범위 등).

## 요구 사항

- Node.js 18+
- Android Studio / Xcode(macOS) — 플랫폼별 네이티브 빌드용

## 설치 및 실행

```bash
npm install
```

```bash
# Metro
npm start
```

```bash
# Android
npm run android
```

```bash
# iOS (macOS)
cd ios && pod install && cd ..
npm run ios
```

## API · 인증 요약

- 통신: `fetch`, 보호된 요청은 `Authorization: Bearer <accessToken>`
- 토큰: AsyncStorage (`src/api/tokenStorage.ts`)
- 401 시 리프레시 시도: `src/api/auth/refresh.ts`

웹 프론트의 `NEXT_PUBLIC_BACKEND_*` 와 별개로, **앱은 오직 `apiConfig.ts`의 베이스 URL**만 맞으면 됩니다.

## 빌드

Android 릴리즈 APK/AAB는 Android Gradle로 생성합니다.

```bash
cd android
./gradlew assembleRelease
```

iOS는 Xcode에서 워크스페이스를 열어 Archive 합니다.

## 테스트

```bash
npm test
```

## 트러블슈팅

**Metro 캐시**

```bash
npm start -- --reset-cache
```

**Android 클린 빌드**

```bash
cd android && ./gradlew clean && cd ..
```

**포트 8081 사용 중**

Windows: `netstat -ano | findstr :8081` 후 해당 PID 종료.

## 보안

자세한 내용은 [SECURITY.md](./SECURITY.md)를 참고하세요.

## 라이선스

이 프로젝트는 개인/교육 목적으로 개발되었습니다.
