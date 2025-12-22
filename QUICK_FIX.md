# Expo Go 호환성 문제 빠른 해결

## 문제

현재 프로젝트는 **React Native CLI**로 설정되어 있어 Expo Go와 호환되지 않는 라이브러리가 있습니다:

- ❌ `react-native-image-picker` - Expo Go에서 작동 안 함
- ⚠️ `react-native-reanimated` - 제한적 작동
- ⚠️ 기타 네이티브 모듈들

## 빠른 해결 방법

### 옵션 1: Expo Development Build 사용 (권장) ⭐

모든 기능을 사용할 수 있습니다:

```bash
# 1. 프로젝트 준비
npx expo prebuild

# 2. Android Development Build 생성 및 실행
npx expo run:android

# 3. 개발 서버 시작 (별도 터미널)
npm run expo
```

**장점**: 모든 네이티브 모듈 사용 가능  
**단점**: 빌드 시간 필요 (약 5-10분)

### 옵션 2: 에뮬레이터 계속 사용 (현재 방식) ✅

Expo Go 대신 에뮬레이터를 사용:

```bash
# Android 에뮬레이터 실행
npm run android
```

**장점**: 모든 기능 작동, 빠른 개발  
**단점**: 에뮬레이터 필요

### 옵션 3: Expo Go로 제한적 테스트

Expo Go는 간단한 UI 테스트용으로만 사용:

```bash
npm run expo
```

**주의**: 일부 기능이 작동하지 않을 수 있음

## 권장 사항

**개발**: 에뮬레이터 사용 (`npm run android`)  
**빠른 테스트**: Expo Development Build  
**프로토타이핑**: Expo Go (제한적)

## 다음 단계

어떤 방법을 사용하시겠습니까?

1. **Expo Development Build 설정** (모든 기능 사용)
2. **에뮬레이터 계속 사용** (현재 방식 유지)
3. **Expo Go 호환성 개선** (제한적 기능만)

