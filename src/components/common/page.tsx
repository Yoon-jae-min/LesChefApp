//기타
import React, { useState } from "react";
import { StyleSheet, View,  Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Component
import Top from "./top/top";
import MenuBox from "./menu/menuBox"; 
import PageMain from "../main/pageMain";
import PageRecipe from "../recipe/pageRecipe";
import PageMy from "../myPage/pageMy";
import PageCommunity from "../community/pageCommunity";


//Context
import { CommonProvider } from "../../context/commonContext";

//Redux
import { Provider } from "react-redux";
import { store } from "../../redux/store";

const RootStack = createNativeStackNavigator();

function Page(): React.JSX.Element{
    const [menuActive, setMenuActive] = useState(false);

    return(
        <GestureHandlerRootView>
            <NavigationContainer>
                <CommonProvider>
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
                </CommonProvider>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: "relative",
    },
    body:{
        flex: 1,
        backgroundColor: "white",
    },
    searchBox:{
        width: "90%",
        height: 44,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: 5,
        marginBottom: 10,
        textAlign: "center",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        color: "rgba(160, 160, 160, 1)"
    },
    menuBackground:{
        zIndex: 5,
        position: "absolute",
        top: 70,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0)",
    }
});

export default Page;