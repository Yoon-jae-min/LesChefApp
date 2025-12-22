# 프로젝트 구조 재구성 가이드

## 현재 구조의 문제점

1. **컴포넌트와 스타일 분리**: 컴포넌트와 스타일이 다른 폴더에 있어 찾기 어려움
2. **모호한 네이밍**: `useElement` 같은 이름이 명확하지 않음
3. **스타일 파일 오타**: `stroage.style.tsx` → `storage.style.tsx` (수정 완료)
4. **중복된 구조**: Context와 Redux가 혼재되어 있음

## 개선된 구조 제안

### 옵션 1: 점진적 개선 (권장)
기존 구조를 유지하면서 개선:
- 컴포넌트와 스타일을 같은 폴더에 배치 (colocation)
- 명확한 네이밍 적용
- 불필요한 파일 정리

### 옵션 2: Features 기반 구조
```
src/
├── features/
│   ├── recipe/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── types/
│   │   └── hooks/
│   ├── community/
│   ├── myPage/
│   └── main/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── styles/
└── core/
    ├── context/
    ├── redux/
    └── navigation/
```

## 적용된 개선 사항

1. ✅ 스타일 파일 오타 수정 (`stroage` → `storage`)
2. ✅ `uploadTop` 컴포넌트와 스타일 colocation 적용 (예시)

## 다음 단계

### 단계 1: 컴포넌트-스타일 Colocation
모든 컴포넌트의 스타일을 같은 폴더로 이동:
```bash
# 예시
src/components/common/useElement/btnAndTitle/
  ├── uploadTop.tsx
  └── uploadTop.style.tsx  # 이동됨
```

### 단계 2: 명확한 네이밍
- `useElement` → `ui` 또는 `shared/components`
- 일관된 파일 네이밍 규칙 적용

### 단계 3: 불필요한 파일 정리
- 사용되지 않는 더미 데이터 확인
- 중복 코드 제거

### 단계 4: Import 경로 정리
- 상대 경로를 절대 경로로 변경
- Alias 설정 확장 (`@components`, `@features` 등)

## 권장 사항

1. **점진적 개선**: 한 번에 모든 것을 바꾸지 말고 단계적으로 진행
2. **테스트**: 각 단계마다 테스트하여 동작 확인
3. **문서화**: 변경 사항을 문서로 기록
4. **팀 협의**: 큰 구조 변경은 팀과 협의 후 진행

## 자동화 스크립트

구조 재구성을 위한 스크립트를 작성할 수 있습니다:
- 파일 이동
- Import 경로 자동 업데이트
- 검증 및 테스트

