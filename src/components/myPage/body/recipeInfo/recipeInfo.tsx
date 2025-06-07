//기타
import React, { useCallback } from "react";
import { View } from "react-native";

//style
import styles from "@styles/myPage/body/recipeInfo/recipeInfo.style";

//Component
import InfoBox from "../../../../components/recipe/info/infoBox";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Context
import { useCommon } from "../../../../context/commonContext";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

function RecipeInfo(): React.JSX.Element{
    const {categoryTotal, success} = useCommon();
    const {categoryChange} = useCategory();

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "RecipeInfo");
                categoryChange(mainIndex, subIndex, 0, 0);
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    );

    return(
        <View style = {styles.containter}>
            <InfoBox/>
        </View>
    )
}

export default RecipeInfo;