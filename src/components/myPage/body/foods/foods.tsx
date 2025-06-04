//기타
import React from "react";
import { Text, View } from "react-native";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setCategoryValue } from "../../../../redux/commonSlice";
import { RootState } from "../../../../redux/store";

//Context
import { useCommon } from "../../../../context/commonContext";
import { useMyPage } from "../../../../context/myPageContext";

//style
import styles from "@styles/myPage/body/foods/foods.style";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

function Foods(): React.JSX.Element{
    const {categoryTotal, mainPage, subPage} = useCommon();
    const {focus} = useMyPage();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const dispatch = useDispatch();

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Foods");

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
        <View style={styles.container}>
            <Text>Foods</Text>
        </View>
    )
}

export default Foods;