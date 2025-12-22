# Expo Go 사용 가이드

## Expo Go로 앱 실행하기

### 1. Expo Go 앱 설치
- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)에서 Expo Go 설치
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)에서 Expo Go 설치

### 2. 개발 서버 시작

#### 방법 1: 기본 모드 (같은 네트워크 필요)
```bash
npm run expo
```
또는
```bash
npx expo start
```

터미널에 QR 코드가 표시됩니다.

#### 방법 2: 터널 모드 (다른 네트워크에서도 가능)
```bash
npm run expo:tunnel
```
또는
```bash
npx expo start --tunnel
```

터널 모드는 인터넷 연결이 필요하지만, 같은 Wi-Fi에 연결할 필요가 없습니다.

### 3. QR 코드 스캔

#### Android
1. Expo Go 앱 열기
2. "Scan QR code" 버튼 클릭
3. 터미널에 표시된 QR 코드 스캔

#### iOS
1. Expo Go 앱 열기
2. 카메라로 터미널의 QR 코드 스캔

### 4. QR 코드가 안 나올 때

#### 해결 방법 1: 터널 모드 사용
```bash
npm run expo:tunnel
```

#### 해결 방법 2: 수동으로 URL 입력
터미널에 표시된 URL을 직접 입력:
- 예: `exp://192.168.0.1:8081`
- Expo Go 앱에서 "Enter URL manually" 선택 후 입력

#### 해결 방법 3: 네트워크 확인
- PC와 폰이 같은 Wi-Fi에 연결되어 있는지 확인
- 방화벽이 8081 포트를 차단하지 않는지 확인

#### 해결 방법 4: 포트 변경
```bash
npx expo start --port 19000
```

### 5. 개발 중 유용한 명령어

#### 개발 서버 재시작
```bash
npm run expo
```

#### 캐시 클리어 후 시작
```bash
npx expo start --clear
```

#### 특정 플랫폼만 실행
```bash
npx expo start --android
npx expo start --ios
```

## 주의사항

### Expo Go 제한사항
Expo Go는 일부 네이티브 모듈을 지원하지 않을 수 있습니다:

1. **react-native-image-picker**: 
   - Expo Go에서는 작동하지 않을 수 있음
   - `expo-image-picker` 사용 (이미 설치됨)
   - `uploadTop.tsx`에서 이미 Expo/React Native 자동 전환 기능 구현됨

2. **네이티브 모듈**:
   - 일부 커스텀 네이티브 모듈은 Expo Go에서 작동하지 않을 수 있음
   - 필요시 Expo Development Build 사용

### 문제 해결

#### "Unable to resolve module" 오류
```bash
# node_modules 재설치
rm -rf node_modules
npm install

# Metro 캐시 클리어
npx expo start --clear
```

#### 연결 오류
1. 같은 Wi-Fi 네트워크 확인
2. 방화벽 설정 확인
3. 터널 모드 사용: `npm run expo:tunnel`

#### 앱이 로드되지 않음
1. 개발 서버가 실행 중인지 확인
2. Expo Go 앱을 완전히 종료 후 다시 시작
3. QR 코드를 다시 스캔

## 빠른 시작

```bash
# 1. 개발 서버 시작
npm run expo

# 2. QR 코드 스캔 (Expo Go 앱에서)
# 또는 터널 모드 사용
npm run expo:tunnel
```

## 추가 리소스

- [Expo Go 문서](https://docs.expo.dev/get-started/expo-go/)
- [Expo 개발 가이드](https://docs.expo.dev/workflow/development-builds/)

