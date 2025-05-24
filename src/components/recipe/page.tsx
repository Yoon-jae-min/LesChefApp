//기타
import React from "react";
import { View } from "react-native";

//Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Component
import ListPage from "./list/page";
import InfoPage from "./info/page";

//style
import styles from "@styles/recipe/page.style";

const RecipeStack = createNativeStackNavigator();

function PageRecipe(): React.JSX.Element{

    return(
        <View style={styles.container}>
            <RecipeStack.Navigator screenOptions={{headerShown: false}}>
                <RecipeStack.Screen name="List" component={ListPage}/>
                <RecipeStack.Screen name="Info" component={InfoPage}/>
            </RecipeStack.Navigator>
        </View>
    )
}

export default PageRecipe;