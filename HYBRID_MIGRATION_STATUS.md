# 하이브리드 마이그레이션 진행 상황

## 완료된 작업 ✅

### 1. 공통 컴포넌트
- ✅ `src/components/common/Top.tsx` - 웹의 Top 헤더
- ✅ `src/components/common/TabNavigation.tsx` - 웹의 TabNavigation
- ✅ `src/components/common/FilterTabs.tsx` - 웹의 FilterTabs

### 2. 스타일 시스템
- ✅ `src/styles/theme.ts` - 웹의 Tailwind CSS를 React Native로 변환
  - 색상, 둥근 모서리, 그림자, 폰트 크기, 간격 등

### 3. 페이지
- ✅ `src/components/Home/HomePage.tsx` - 웹의 홈 페이지
- ✅ `src/components/Recipe/RecipePage.tsx` - 웹의 레시피 리스트 페이지

### 4. 네비게이션
- ✅ `App.tsx` 업데이트 - 새로운 네비게이션 구조

## 유지된 기존 파일들

### Redux
- ✅ `src/redux/store.tsx` - Redux store 설정
- ✅ `src/redux/*Slice.tsx` - Redux slices

### Types
- ✅ `src/types/*.tsx` - 타입 정의들

### Utils
- ✅ `src/utils/imagePicker.ts` - 이미지 선택 유틸리티
- ✅ `src/utils/validation.ts` - 유효성 검사
- ✅ `src/utils/imageValidation.ts` - 이미지 유효성 검사
- ✅ `src/utils/apiErrorHandler.ts` - API 에러 핸들러

### Assets
- ✅ `src/assets/` - 이미지 리소스
- ✅ `src/assets/images.ts` - 이미지 상수

## 남은 작업

### 페이지 생성 필요
1. ⏳ `src/components/Recipe/RecipeDetailPage.tsx` - 레시피 상세 페이지
2. ⏳ `src/components/Board/BoardPage.tsx` - 게시판 페이지
3. ⏳ `src/components/Board/BoardDetailPage.tsx` - 게시판 상세 페이지
4. ⏳ `src/components/MyPage/MyPage.tsx` - 마이페이지 메인
5. ⏳ `src/components/MyPage/InfoPage.tsx` - 내 정보 페이지
6. ⏳ `src/components/MyPage/StoragePage.tsx` - 보관함 페이지

### 기능 통합 필요
- [ ] 기존 Redux와 새 컴포넌트 연결
- [ ] 기존 Utils를 새 컴포넌트에서 사용
- [ ] API 연동 (웹의 utils/recipeApi.ts 참고)

## 웹 → 모바일 변환 규칙

### 스타일 변환
| 웹 (Tailwind) | React Native |
|--------------|--------------|
| `rounded-[32px]` | `borderRadius: 32` |
| `shadow-[6px_6px_0_rgba(0,0,0,0.05)]` | `...shadows.card` |
| `bg-white` | `backgroundColor: colors.white` |
| `p-6` | `padding: 24` |
| `text-2xl` | `fontSize: 24` |

### 컴포넌트 변환
| 웹 | React Native |
|----|--------------|
| `div` | `View` |
| `button` | `Pressable` |
| `input` | `TextInput` |
| `img` | `Image` |
| `Link` | `navigation.navigate()` |

## 테스트 방법

```bash
npm run expo
```

현재 작동하는 화면:
- ✅ 홈 페이지
- ✅ 레시피 페이지 (한식 기본)

## 다음 단계

1. 레시피 상세 페이지 생성
2. 게시판 페이지 생성
3. 마이페이지 생성
4. API 연동

