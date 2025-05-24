//기타
import React, { useState } from "react";
import { View,  Pressable } from "react-native";

//Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Component
import Top from "./top/top";
import MenuBox from "./menu/menuBox"; 
import PageMain from "../main/page";
import PageRecipe from "../recipe/page";
import PageMy from "../myPage/page";
import PageCommunity from "../community/page";

//Redux
import { Provider } from "react-redux";
import { store } from "../../redux/store";

//style
import styles from "@styles/common/page.style";

const RootStack = createNativeStackNavigator();

function Page(): React.JSX.Element{
    const [menuActive, setMenuActive] = useState(false);

    return(
        <Provider store={store}>
            <View style={styles.container}>
                <Top 
                    menuActive={menuActive} 
                    setMenuActive={setMenuActive}/>
                <MenuBox 
                    menuActive={menuActive} 
                    setMenuActive={setMenuActive}/>
                {menuActive && <Pressable onPress={() => setMenuActive(false)} style={styles.menuBackground}/>}
                <View style={styles.body}>
                    <RootStack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
                        <RootStack.Screen name="Main" component={PageMain}/>
                        <RootStack.Screen name="Recipe" component={PageRecipe}/>
                        <RootStack.Screen name="Community" component={PageCommunity}/>
                        <RootStack.Screen name="MyPage" component={PageMy}/>
                    </RootStack.Navigator>
                </View>
            </View>
        </Provider>
    )
}

export default Page;