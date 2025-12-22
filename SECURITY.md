# 🔒 LesChefApp 보안 가이드

## 개요

이 문서는 LesChef 모바일 앱의 보안 기능과 예외 처리에 대해 설명합니다.

## 구현된 보안 기능

### 1. 입력 검증 (`src/utils/validation.ts`)

#### 텍스트 검증
- **필수 입력 검증**: 필수 필드가 비어있는지 확인
- **길이 제한**: 최소/최대 길이 검증
- **이메일 형식 검증**: 이메일 형식 확인
- **숫자 범위 검증**: 숫자 입력의 최소/최대값 확인
- **양수 검증**: 양수만 허용

#### 사용 예시
```typescript
import { validateText } from '../utils/validation';

// 필수 입력 검증
const error = validateText.required(title, "제목");
if (error) {
  Alert.alert("오류", error);
}

// 숫자 범위 검증
const error = validateText.numberRange(portion, 1, 100, "인분");
```

### 2. 이미지 업로드 보안 (`src/utils/imageValidation.ts`)

#### 검증 항목
- **파일 크기 제한**: 최대 5MB
- **파일 타입 검증**: JPG, PNG, WEBP만 허용
- **확장자 검증**: URI 기반 확장자 확인
- **에러 처리**: 카메라/갤러리 권한, 에러 코드 처리

#### 사용 예시
```typescript
import { validateImage } from '../utils/imageValidation';

const result = await launchImageLibrary({mediaType: "photo"});
const validation = validateImage(result);

if (!validation.isValid) {
  Alert.alert("오류", validation.error);
  return;
}
```

### 3. API 에러 처리 (`src/utils/apiErrorHandler.ts`)

#### 기능
- **네트워크 에러 감지**: 네트워크 연결 상태 확인
- **HTTP 상태 코드 처리**: 각 상태 코드별 사용자 친화적 메시지
- **에러 메시지 포맷팅**: 일관된 에러 메시지 형식

#### 사용 예시
```typescript
import { apiCall, formatApiError } from '../utils/apiErrorHandler';

const result = await apiCall(
  async () => {
    return await fetch('/api/recipe');
  },
  (error) => {
    Alert.alert("오류", error);
  }
);
```

### 4. XSS 방지

#### 텍스트 Sanitization
- HTML 태그 이스케이프
- 특수 문자 처리

```typescript
import { sanitizeText } from '../utils/validation';

const safeText = sanitizeText(userInput);
```

## 입력 필드 검증

### 레시피 작성
- **제목**: 필수, 최대 100자
- **인분**: 1-100 범위
- **시간**: 1-1440분 범위
- **이미지**: 크기 및 타입 검증

### 커뮤니티 게시글
- **제목**: 필수, 최대 100자
- **내용**: 최대 5000자

## 예외 처리

### 이미지 선택
- 카메라 권한 오류
- 갤러리 접근 오류
- 파일 크기 초과
- 지원하지 않는 파일 형식

### 네트워크 오류
- 연결 실패
- 타임아웃
- 서버 오류

### 입력 검증 오류
- 필수 필드 누락
- 형식 오류
- 범위 초과

## 보안 권장사항

### 1. 민감한 정보 저장
- 비밀번호는 절대 평문으로 저장하지 않음
- 세션 토큰은 안전한 저장소 사용 (예: Keychain/Keystore)

### 2. API 통신
- HTTPS만 사용
- 인증 토큰은 헤더에 포함
- 민감한 데이터는 암호화하여 전송

### 3. 사용자 입력
- 모든 사용자 입력 검증
- 서버 사이드에서도 재검증
- XSS 방지를 위한 Sanitization

### 4. 이미지 업로드
- 파일 크기 제한
- 파일 타입 검증
- 서버에서도 재검증

## 향후 개선 사항

1. **비밀번호 강도 검증**: 복잡도 요구사항 추가
2. **Rate Limiting**: 클라이언트 사이드 요청 제한
3. **로깅**: 보안 관련 이벤트 로깅
4. **자동 업데이트**: 보안 패치 자동 적용

## 관련 파일

- `src/utils/validation.ts`: 입력 검증 유틸리티
- `src/utils/imageValidation.ts`: 이미지 검증 유틸리티
- `src/utils/apiErrorHandler.ts`: API 에러 처리 유틸리티

