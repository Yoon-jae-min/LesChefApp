# 프로젝트 구조 재구성 계획

## 목표
유지보수에 유리한 구조로 재구성

## 새로운 구조

```
src/
├── features/              # 기능별 모듈 (Features 기반)
│   ├── recipe/
│   │   ├── components/    # 레시피 관련 컴포넌트
│   │   ├── styles/        # 레시피 관련 스타일
│   │   ├── types/         # 레시피 관련 타입
│   │   ├── hooks/         # 레시피 관련 훅
│   │   └── index.ts       # Public API
│   ├── community/
│   ├── myPage/
│   └── main/
├── shared/                # 공통 리소스
│   ├── components/        # 재사용 가능한 UI 컴포넌트
│   │   ├── ui/           # 기본 UI 컴포넌트 (기존 useElement)
│   │   ├── layout/       # 레이아웃 컴포넌트
│   │   └── navigation/   # 네비게이션 컴포넌트
│   ├── hooks/            # 공통 훅
│   ├── utils/            # 유틸리티 함수
│   ├── types/            # 공통 타입
│   └── styles/           # 공통 스타일 (theme 등)
├── core/                 # 핵심 설정
│   ├── context/          # Context Providers
│   ├── redux/           # Redux 설정
│   └── navigation/      # 네비게이션 설정
└── assets/              # 정적 리소스
    └── images/
```

## 변경 사항

1. **Features 기반 구조**: 기능별로 모듈화
2. **컴포넌트-스타일 Colocation**: 같은 폴더에 배치
3. **명확한 네이밍**: `useElement` → `ui`
4. **공통 리소스 통합**: `shared` 폴더로 통합
5. **타입 정리**: 기능별 타입을 features 내부로 이동

## 진행 단계

1. ✅ 스타일 파일 오타 수정
2. ⏳ 공통 컴포넌트를 shared로 이동
3. ⏳ Features 기반 구조로 재구성
4. ⏳ 컴포넌트-스타일 colocation
5. ⏳ Import 경로 업데이트

