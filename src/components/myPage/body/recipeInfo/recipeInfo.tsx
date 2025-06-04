//기타
import React from "react";
import { View } from "react-native";

//style
import styles from "@styles/myPage/body/recipeInfo/recipeInfo.style";

//Component
import InfoBox from "../../../../components/recipe/info/infoBox";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Context
import { useCommon } from "../../../../context/commonContext";
import { useMyPage } from "../../../../context/myPageContext";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setCategoryValue } from "../../../../redux/commonSlice";

function RecipeInfo(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const {focus} = useMyPage();
    const dispatch = useDispatch();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "RecipeInfo");

        const nextValue = {
            main: categoryTotal[mainIndex].main,
            sub: categoryTotal[mainIndex].sub[subIndex],
            detail: categoryTotal[mainIndex].detail[subIndex][0],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0],
        }

        if(nextValue.main !== categoryValue.main || nextValue.sub !== categoryValue.sub){
            if(!focus.current){
                dispatch(setCategoryValue({
                    ...categoryValue,
                    ...nextValue
                }));
                focus.current = !focus.current;
            }
        }else{
            focus.current = !focus.current;
        }
    });

    return(
        <View style = {styles.containter}>
            <InfoBox/>
        </View>
    )
}

export default RecipeInfo;