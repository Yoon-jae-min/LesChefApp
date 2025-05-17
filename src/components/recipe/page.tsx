//기타
import React from "react";
import { View } from "react-native";

//Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Component
import ListContainer from "./list/listBox";
import InfoContainer from "./info/infoBox";

//Context
import { RecipeProvider } from "../../context/recipeContext";

//style
import styles from "@styles/recipe/page.style";

const RecipeStack = createNativeStackNavigator();

function PageRecipe(): React.JSX.Element{

    return(
        <View style={styles.container}>
            <RecipeProvider>
                <RecipeStack.Navigator screenOptions={{headerShown: false}}>
                    <RecipeStack.Screen name="List" component={ListContainer}/>
                    <RecipeStack.Screen name="Info" component={InfoContainer}/>
                </RecipeStack.Navigator>
            </RecipeProvider>
        </View>
    )
}

export default PageRecipe;