//기타
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCategoryValue } from "../../../redux/commonSlice";

//Context
import { useCommon } from "../../../context/commonContext";

function Info(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const dispatch = useDispatch();

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Info");

        const nextValue = {
            main: categoryTotal[mainIndex].main,
            sub: categoryTotal[mainIndex].sub[subIndex],
            detail: categoryTotal[mainIndex].detail[subIndex][0],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0],
        }

        if(nextValue.main !== categoryValue.main || nextValue.sub !== categoryValue.sub){
            dispatch(setCategoryValue({
                ...categoryValue,
                ...nextValue
            }));
        }
    });

    return(
        <View></View>
    )
}

export default Info;