//기타
import React from "react";
import { View } from "react-native";

//Component
import SelectMyMenu from "./top/selectMenu";
import WishList from "./body/wishList/wishList";
import Info from "./body/info/info";
import Storage from "./body/storage/storage";
import MyRecipe from "./body/myRecipe/myRecipe";
import RecipeInfo from "./body/recipeInfo/recipeInfo";
import RecipeWrite from "./body/recipeWrite/recipeWrite";

//Context
import { useCommon } from "../../context/commonContext";

//Redux
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

//style
import styles from "@styles/myPage/page.style";

//Navigate
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MyPageStack = createNativeStackNavigator();

function PageMy(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);

    return(
        <View style={styles.container}>
                <SelectMyMenu categoryValue={categoryValue} categoryTotal={categoryTotal}/>
                <MyPageStack.Navigator screenOptions={{headerShown: false}}>
                    <MyPageStack.Screen name="Info" component={Info}/>
                    <MyPageStack.Screen name="Storage" component={Storage}/>
                    <MyPageStack.Screen name="WishList" component={WishList}/>
                    <MyPageStack.Screen name="MyRecipe" component={MyRecipe}/>
                    <MyPageStack.Screen name="RecipeInfo" component={RecipeInfo}/>
                    <MyPageStack.Screen name="RecipeWrite" component={RecipeWrite}/>
                </MyPageStack.Navigator>
        </View>
        
    )
}

export default PageMy;