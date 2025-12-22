/**
 * @format
 */

//기타
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';

// React Native는 기본적으로 "main"으로 등록해야 함
// Expo를 사용하는 경우에도 "main"이 표준
const appName = 'main';

AppRegistry.registerComponent(appName, () => App);
