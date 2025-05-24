//기타
import React from "react";
import { View } from "react-native";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//component
import ListBox from "../../recipe/list/listBox";

//style
import styles from "@styles/myPage/body/wishList.style";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCategoryValue } from "../../../redux/commonSlice";

//Context
import { useCommon } from "../../../context/commonContext";
import { useMyPage } from "../../../context/myPageContext";

function WishList(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const {focus} = useMyPage();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const dispatch = useDispatch();

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "WishList");

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
            <ListBox/>
        </View>
    )
}

export default WishList;