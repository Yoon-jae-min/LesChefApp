//기타
import React from "react";
import { View } from "react-native";

//style
import styles from "@styles/recipe/info/page.style";

//Component
import InfoBox from "./infoBox";

//Context
import { useCommon } from "../../../context/commonContext";
import { useRecipe } from "../../../context/recipeContext";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCategoryValue } from "../../../redux/commonSlice";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

function Page(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const {focus} = useRecipe();
    const dispatch = useDispatch();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Recipe");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Info");
        const nextValue = {
            main: categoryTotal[mainIndex].main,
            sub: categoryTotal[mainIndex].sub[subIndex],
            detail: categoryTotal[mainIndex].detail[subIndex][0],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0]
        }

        if(categoryValue.main !== nextValue.main || categoryValue.sub !== nextValue.sub){
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
        <View style={styles.container}>
            <InfoBox/>
        </View>
    )
}

export default Page;