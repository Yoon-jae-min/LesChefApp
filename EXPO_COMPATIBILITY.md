# Expo Go 호환성 문제 해결 가이드

## 문제 원인

현재 프로젝트는 **React Native CLI**로 설정되어 있으며, 일부 라이브러리가 **Expo Go**와 호환되지 않습니다.

### 호환되지 않는 라이브러리

1. **react-native-image-picker** ❌
   - Expo Go에서 작동하지 않음
   - 대안: `expo-image-picker` 사용 (이미 설치됨)

2. **react-native-reanimated** ⚠️
   - Expo Go에서 제한적으로 작동
   - 일부 기능이 작동하지 않을 수 있음

3. **react-native-screens** ⚠️
   - Expo Go에서 작동하지만 제한적

4. **react-native-gesture-handler** ✅
   - Expo Go에서 작동 (일부 기능 제한)

## 해결 방법

### 방법 1: Expo Development Build 사용 (권장) ⭐

Expo Go 대신 **Expo Development Build**를 사용하면 모든 네이티브 모듈을 사용할 수 있습니다.

#### 장점:
- 모든 네이티브 모듈 사용 가능
- Expo Go보다 더 많은 기능 지원
- 프로덕션 빌드와 유사한 환경

#### 단점:
- 빌드 시간이 필요함
- 기기에 직접 설치해야 함

#### 설치 방법:
```bash
# Expo CLI 설치 (이미 설치됨)
npm install -g expo-cli

# Development Build 생성
npx expo prebuild

# Android 빌드
npx expo run:android

# iOS 빌드 (macOS만)
npx expo run:ios
```

### 방법 2: Expo Go 호환 모드로 전환

Expo Go에서 작동하도록 코드를 수정합니다.

#### 필요한 변경사항:

1. **이미지 선택기 교체**
   - ✅ 이미 완료: `imagePicker.ts`에서 자동 전환 기능 구현됨
   - Expo Go에서는 `expo-image-picker` 자동 사용

2. **react-native-reanimated 조건부 처리**
   - Expo Go 감지 시 대체 애니메이션 사용

3. **react-native-screens 조건부 처리**
   - Expo Go 감지 시 기본 네비게이션 사용

### 방법 3: 에뮬레이터/시뮬레이터 사용 (현재 방식)

Expo Go 대신 에뮬레이터나 시뮬레이터를 사용합니다.

```bash
# Android 에뮬레이터
npm run android

# iOS 시뮬레이터 (macOS만)
npm run ios
```

## 권장 사항

### 개발 환경별 사용 방법

1. **빠른 프로토타이핑**: Expo Go (제한적 기능)
2. **전체 기능 테스트**: Expo Development Build
3. **네이티브 기능 테스트**: 에뮬레이터/시뮬레이터

### 현재 프로젝트 상태

- ✅ `expo-image-picker` 설치됨
- ✅ `imagePicker.ts`에서 자동 전환 기능 구현됨
- ⚠️ `react-native-reanimated`는 Expo Go에서 제한적
- ⚠️ 일부 네이티브 모듈은 Expo Go에서 작동하지 않을 수 있음

## 다음 단계

### 옵션 A: Expo Development Build 사용 (권장)

```bash
# 1. 프로젝트 준비
npx expo prebuild

# 2. Android Development Build
npx expo run:android

# 3. 개발 서버 시작
npm run expo
```

### 옵션 B: 에뮬레이터 계속 사용

현재처럼 에뮬레이터를 사용하고, Expo Go는 간단한 테스트용으로만 사용:

```bash
# 에뮬레이터 실행
npm run android

# 또는 Expo Go로 간단 테스트 (제한적)
npm run expo
```

### 옵션 C: Expo Go 호환성 개선

Expo Go에서 작동하지 않는 기능을 조건부로 처리:

1. `react-native-reanimated` 사용 부분 감지
2. Expo Go 환경에서는 대체 애니메이션 사용
3. 네이티브 모듈 사용 전 환경 확인

## 결론

**Expo Go는 현재 프로젝트의 모든 기능을 지원하지 않습니다.**

가장 좋은 방법은:
- **Expo Development Build** 사용 (모든 기능 지원)
- 또는 **에뮬레이터/시뮬레이터** 계속 사용 (현재 방식)

Expo Go는 빠른 프로토타이핑용으로만 사용하고, 실제 개발은 Development Build나 에뮬레이터를 사용하는 것을 권장합니다.

