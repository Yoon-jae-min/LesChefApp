//기타
import React from "react";
import { StyleSheet, View } from "react-native";

//Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Component
import ListContainer from "./list/listContainer";
import InfoContainer from "./info/infoContainer";

//Context
import { RecipeProvider } from "../../context/recipeContext";

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

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
})

export default PageRecipe;