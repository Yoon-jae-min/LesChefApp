# 프로젝트 구조 개선 사항

## 완료된 작업

### 1. ✅ 스타일 파일 오타 수정
- `stroage.style.tsx` → `storage.style.tsx` 수정
- 관련 import 경로 업데이트

### 2. ✅ 컴포넌트-스타일 Colocation (예시 적용)
- `uploadTop.tsx`와 `uploadTop.style.tsx`를 같은 폴더에 배치
- 상대 경로 import로 변경 (`./uploadTop.style`)

## 권장 개선 사항

### 1. 공통 스타일 관리
현재 `editTop`, `likeTop`, `uploadTop`이 `titleTop.style.tsx`를 공유:
- 공통 스타일은 `shared/styles/` 또는 컴포넌트 폴더 내 `common.style.tsx`로 관리
- 개별 스타일이 필요한 경우만 컴포넌트별 스타일 파일 생성

### 2. 폴더 구조 개선

#### 현재 구조
```
src/
├── components/
│   ├── common/
│   │   └── useElement/  # 모호한 이름
│   ├── recipe/
│   ├── community/
│   └── myPage/
├── styles/  # 컴포넌트와 분리됨
└── ...
```

#### 개선된 구조 (점진적 적용)
```
src/
├── components/
│   ├── shared/          # useElement → shared로 변경
│   │   ├── ui/         # 기본 UI 컴포넌트
│   │   ├── layout/      # 레이아웃 컴포넌트
│   │   └── navigation/ # 네비게이션 컴포넌트
│   ├── recipe/
│   │   ├── components/
│   │   └── styles/     # recipe 관련 스타일만
│   └── ...
├── shared/              # 공통 리소스
│   ├── styles/         # 공통 스타일 (theme 등)
│   ├── utils/
│   └── types/
└── ...
```

### 3. Import 경로 개선

#### 현재
```typescript
import styles from "@styles/common/useElement/btnAndTitle/titleTop.style";
import { useCommon } from "../../../../context/commonContext";
```

#### 개선
```typescript
// Alias 확장
import styles from "./uploadTop.style";  // colocation
import { useCommon } from "@core/context/commonContext";
import { Button } from "@shared/components/ui";
```

### 4. 타입 정리
- 기능별 타입을 해당 feature 폴더로 이동
- 공통 타입만 `shared/types/`에 유지

### 5. 불필요한 파일 정리
- `dummyContext.tsx`: 개발용 더미 데이터 - 실제 API 연동 시 제거 고려
- 사용되지 않는 스타일 파일 확인

## 다음 단계

### 단계 1: 공통 컴포넌트 정리
1. `useElement` → `shared/ui`로 폴더명 변경
2. 공통 스타일 파일 정리

### 단계 2: Features 기반 구조 (선택사항)
각 feature를 독립적인 모듈로 구성:
- `features/recipe/`
- `features/community/`
- `features/myPage/`
- `features/main/`

### 단계 3: Import 경로 정리
- Alias 확장 (`@shared`, `@features`, `@core`)
- 상대 경로를 절대 경로로 변경

### 단계 4: 문서화
- 컴포넌트 구조 문서화
- 스타일 가이드 정리
- 개발 가이드 업데이트

## 주의사항

1. **점진적 개선**: 한 번에 모든 것을 바꾸지 말고 단계적으로 진행
2. **테스트**: 각 변경 후 테스트 필수
3. **팀 협의**: 큰 구조 변경은 팀과 협의
4. **Git 관리**: 각 단계를 별도 커밋으로 관리

## 자동화 가능한 작업

다음 작업들은 스크립트로 자동화 가능:
- 파일 이동 및 import 경로 업데이트
- 폴더명 변경 및 참조 업데이트
- 사용되지 않는 파일 검색

