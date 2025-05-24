//기타
import React, { useState } from "react";
import { View } from "react-native";

//Component
import SelectMyMenu from "./top/selectMenu";
import WishList from "./body/wishList";
import Info from "./body/info";
import Foods from "./body/foods";
import MyRecipe from "./body/myRecipe";
import RecipeInfo from "./body/recipeInfo";
import RecipeWrite from "./body/recipeWrite";

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
    const {categoryTotal, subPage} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const [categoryTrig, setCategoryTrig] = useState(false);

    return(
        <View style={styles.container}>
                {(subPage.current.now !== "RecipeInfo" && subPage.current.now !== "RecipeWrite") &&
                    <SelectMyMenu 
                        categoryValue={categoryValue} 
                        categoryTotal={categoryTotal} 
                        setCategoryTrig={setCategoryTrig}/>}
                <MyPageStack.Navigator screenOptions={{headerShown: false}}>
                    <MyPageStack.Screen name="Info" component={Info}/>
                    <MyPageStack.Screen name="Foods" component={Foods}/>
                    <MyPageStack.Screen name="WishList" component={WishList}/>
                    <MyPageStack.Screen name="MyRecipe" component={MyRecipe}/>
                    <MyPageStack.Screen name="RecipeInfo" component={RecipeInfo}/>
                    <MyPageStack.Screen name="RecipeWrite" component={RecipeWrite}/>
                </MyPageStack.Navigator>
        </View>
        
    )
}

export default PageMy;