# 웹 → 모바일 앱 마이그레이션 가이드

## 완료된 작업

### ✅ 1. 공통 스타일 시스템
- `src/styles/theme.ts` - 웹의 Tailwind CSS 스타일을 React Native로 변환
  - 색상 (colors)
  - 둥근 모서리 (borderRadius) - `rounded-[32px]` = 32
  - 그림자 (shadows) - `shadow-[6px_6px_0_rgba(0,0,0,0.05)]`
  - 그라데이션 색상 (gradients)
  - 폰트 크기, 간격 등

### ✅ 2. Top 헤더 컴포넌트
- `src/components/common/Top.tsx`
- 웹의 Top 컴포넌트와 동일한 디자인
- 로고, 아이콘, 검색바 포함

### ✅ 3. 홈 페이지
- `src/components/Home/HomePage.tsx`
- 웹의 홈 페이지와 동일한 레이아웃
- 히어로 섹션, 뉴스/소식, 식재료 물가, 빠른 링크

### ✅ 4. App.tsx 업데이트
- 새로운 네비게이션 구조로 변경
- HomePage 연결 완료

## 웹 스타일 → React Native 변환 규칙

### Tailwind → React Native StyleSheet

| 웹 (Tailwind) | React Native |
|--------------|--------------|
| `rounded-[32px]` | `borderRadius: 32` |
| `shadow-[6px_6px_0_rgba(0,0,0,0.05)]` | `shadows.card` |
| `bg-white` | `backgroundColor: colors.white` |
| `border border-gray-200` | `borderWidth: 1, borderColor: colors.gray200` |
| `p-6` | `padding: 24` (spacing.lg) |
| `text-2xl` | `fontSize: 24` (fontSize['2xl']) |
| `font-semibold` | `fontWeight: '600'` |
| `from-orange-50 via-yellow-50 to-red-50` | `backgroundColor: colors.orange50` (단색으로 대체) |

### 주요 스타일 패턴

```typescript
// 카드 스타일 (웹의 rounded-[32px] border shadow)
const cardStyle = {
  borderRadius: 32,
  borderWidth: 1,
  borderColor: colors.gray200,
  backgroundColor: colors.white,
  ...shadows.card,
};

// 섹션 헤더
const sectionHeader = {
  marginBottom: 24,
};

const sectionTitle = {
  fontSize: 24,
  fontWeight: '700',
  color: colors.gray900,
  marginBottom: 4,
};
```

## 다음 단계

### 남은 페이지들
1. **레시피 페이지** (`src/components/Recipe/RecipePage.tsx`)
   - 웹: `leschef-web-front/src/app/recipe/[category]/page.tsx`
   - 레시피 리스트 카드 스타일

2. **레시피 상세 페이지** (`src/components/Recipe/RecipeDetailPage.tsx`)
   - 웹: `leschef-web-front/src/app/recipe/detail/page.tsx`
   - 재료, 단계, 댓글 섹션

3. **게시판 페이지** (`src/components/Board/BoardPage.tsx`)
   - 웹: `leschef-web-front/src/app/board/[category]/page.tsx`
   - 게시글 카드 스타일

4. **마이페이지** (`src/components/MyPage/MyPage.tsx`)
   - 웹: `leschef-web-front/src/app/myPage/info/page.tsx`
   - 프로필, 정보 관리

5. **보관함 페이지** (`src/components/MyPage/StoragePage.tsx`)
   - 웹: `leschef-web-front/src/app/myPage/storage/page.tsx`
   - 재료 인벤토리 관리

## 사용 방법

1. **테마 사용**
```typescript
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl, // 32
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    ...shadows.card,
  },
});
```

2. **컴포넌트 구조**
- 웹의 컴포넌트 구조를 그대로 유지
- `div` → `View`
- `button` → `Pressable`
- `input` → `TextInput`
- `img` → `Image`

3. **네비게이션**
- 웹의 `Link` → React Navigation의 `navigation.navigate()`
- 웹의 `useRouter()` → React Navigation의 `useNavigation()`

## 주의사항

1. **그라데이션**: React Native에서는 `expo-linear-gradient`가 필요하지만, 현재는 단색으로 대체
2. **반응형**: 웹의 `sm:`, `md:`, `lg:` 브레이크포인트는 모바일에서는 필요 없음
3. **호버 효과**: 모바일에서는 `onPress` 이벤트로 처리
4. **스크롤**: `ScrollView` 사용 (웹의 자동 스크롤과 유사)

## 파일 구조

```
src/
├── styles/
│   └── theme.ts          # 공통 스타일 (웹의 Tailwind 변환)
├── components/
│   ├── common/
│   │   └── Top.tsx      # 헤더 컴포넌트
│   ├── Home/
│   │   └── HomePage.tsx # 홈 페이지
│   ├── Recipe/          # 레시피 페이지들 (예정)
│   ├── Board/           # 게시판 페이지들 (예정)
│   └── MyPage/          # 마이페이지들 (예정)
└── assets/
    └── images.ts        # 이미지 상수
```

## 테스트

현재까지 구현된 내용:
- ✅ Top 헤더 표시
- ✅ 홈 페이지 기본 레이아웃
- ✅ 네비게이션 구조

다음 명령어로 테스트:
```bash
npm run expo
```

