//기타
import React, { useCallback } from "react";
import { View } from "react-native";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//component
import ListBox from "../../../recipe/list/listBox";

//style
import styles from "@styles/myPage/body/wishList/wishList.style";

//Context
import { useCommon } from "../../../../context/commonContext";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

function WishList(): React.JSX.Element{
    const {categoryTotal, prev, success} = useCommon();
    const {categoryChange} = useCategory();

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "WishList");
                const detailIndex = categoryTotal[mainIndex].detail[subIndex].findIndex(item => 
                    item === prev.current.find(item => item.main === "MyPage" && item.sub === "WishList")?.detail);
                categoryChange(mainIndex, subIndex, detailIndex, 0);
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    );

    return(
        <View style={styles.container}>
            <ListBox/>
        </View>
    )
}

export default WishList;