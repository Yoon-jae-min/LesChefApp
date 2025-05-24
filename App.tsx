//기타
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//Component
import Page from './src/components/common/page';

//Navigation
import { NavigationContainer } from '@react-navigation/native';

//Context
import { CommonProvider } from './src/context/commonContext';
import { RecipeProvider } from './src/context/recipeContext';
import { CommunityProvider } from './src/context/communityContext';
import { MyPageProvider } from './src/context/myPageContext';
import { DummyProvider } from './src/context/dummyContext';
import { MainProvider } from './src/context/mainContext';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <CommonProvider>
        <MainProvider>
          <RecipeProvider>
            <CommunityProvider>
              <MyPageProvider>
                <DummyProvider>
                  <NavigationContainer>
                    <Page/>
                  </NavigationContainer>
                </DummyProvider>
              </MyPageProvider>
            </CommunityProvider>
          </RecipeProvider>
        </MainProvider>
      </CommonProvider>
    </GestureHandlerRootView>
  );
}

export default App;
