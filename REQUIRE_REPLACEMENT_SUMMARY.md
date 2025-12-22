# require → import 변경 완료 요약

## 완료된 작업

### ✅ 1. 이미지 상수 파일 생성
- `src/assets/images.ts` 생성
- 모든 이미지를 `Images` 객체로 export

### ✅ 2. 주요 컴포넌트 변경 완료
다음 컴포넌트들의 `require`를 `Images` import로 변경했습니다:

- ✅ `uploadTop.tsx`
- ✅ `editTop.tsx`
- ✅ `likeTop.tsx`
- ✅ `subSearch.tsx`
- ✅ `listSwitch.tsx`
- ✅ `cmtBox.tsx`
- ✅ `imgSelect.tsx`

## 변경 패턴

### Before
```typescript
<Image source={require("../../../../assets/image/back.png")}/>
```

### After
```typescript
import { Images } from "../../../../assets/images";

<Image source={Images.back}/>
```

## 남은 작업

다음 파일들도 동일한 패턴으로 변경이 필요합니다:

### 공통 컴포넌트
- `components/common/top/top.tsx`
- `components/common/menu/menuBox.tsx`
- `components/common/ui/searchBar/mainSearch.tsx` (이미지 없음)

### 레시피 컴포넌트
- `components/recipe/info/infoBox.tsx`
- `components/recipe/info/stepBox.tsx`
- `components/recipe/list/listScroll.tsx`

### 커뮤니티 컴포넌트
- `components/community/info/infoBody.tsx`
- `components/community/write/writeBody.tsx`
- `components/community/list/listScroll.tsx`

### 마이페이지 컴포넌트
- `components/myPage/body/info/profile.tsx`
- `components/myPage/body/info/btnBox.tsx`
- `components/myPage/body/storage/itemUnit.tsx`
- `components/myPage/body/storage/addOrder.tsx`
- `components/myPage/body/recipeWrite/recipeWrite.tsx`
- `components/myPage/body/recipeWrite/ingredient/*.tsx`
- `components/myPage/body/recipeWrite/step/*.tsx`
- `components/myPage/modal/pwdChange.tsx`
- `components/myPage/modal/infoChange.tsx`
- `components/myPage/modal/pwdCheck.tsx`

## 자동화 스크립트

`scripts/replace-requires.js` 스크립트를 생성했습니다.

### 사용 방법

```bash
# 스크립트 실행
node scripts/replace-requires.js
```

**주의**: 실행 전에 Git 커밋을 권장합니다!

### 스크립트 기능
- 모든 `.tsx`, `.ts` 파일에서 `require(".../image/...")` 찾기
- `Images.키명`으로 자동 교체
- 필요한 경우 `Images` import 자동 추가

## 수동 변경 방법

각 파일에서:

1. **Import 추가** (파일 상단):
```typescript
import { Images } from "../../../../assets/images";
```
*경로는 파일 위치에 맞게 조정*

2. **require 교체**:
```typescript
// Before
require("../../../../assets/image/back.png")

// After
Images.back
```

## 이미지 매핑 참고

`src/assets/images.ts` 파일을 참고하세요. 모든 이미지가 `Images` 객체에 정의되어 있습니다.

## 다음 단계

1. **자동 스크립트 실행** (권장):
   ```bash
   node scripts/replace-requires.js
   ```

2. **또는 수동으로 변경**: 위의 패턴을 따라 각 파일 변경

3. **테스트**: 변경 후 앱이 정상 작동하는지 확인

## 주의사항

- 이미지 파일명과 `Images` 키가 일치해야 함
- 상대 경로는 파일 위치에 맞게 조정 필요
- 변경 후 반드시 테스트 필요

