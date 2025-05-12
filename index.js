/**
 * @format
 */

//기타
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
// import App from './App';
import {name as appName} from './app.json';

//컴포넌트트
import Page from './src/components/common/page';

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => Page);
