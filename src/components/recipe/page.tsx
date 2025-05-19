//기타
import React from "react";
import { View } from "react-native";

//Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Component
import ListBox from "./list/listBox";
import InfoBox from "./info/infoBox";

//style
import styles from "@styles/recipe/page.style";

const RecipeStack = createNativeStackNavigator();

function PageRecipe(): React.JSX.Element{

    return(
        <View style={styles.container}>
            <RecipeStack.Navigator screenOptions={{headerShown: false}}>
                <RecipeStack.Screen name="List" component={ListBox}/>
                <RecipeStack.Screen name="Info" component={InfoBox}/>
            </RecipeStack.Navigator>
        </View>
    )
}

export default PageRecipe;