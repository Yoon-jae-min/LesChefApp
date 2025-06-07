//기타
import React, { useCallback } from "react";
import { View } from "react-native";

//style
import styles from "@styles/recipe/list/page.style";

//Component
import ListBox from "./listBox";

//Context
import { useCommon } from "../../../context/commonContext";

//hooks
import { useCategory } from "../../../hooks/useCategory";
import { useFocusEffect } from "@react-navigation/native";

function Page(): React.JSX.Element{
    const {categoryTotal, prev, success} = useCommon();
    const {categoryChange} = useCategory();

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "Recipe");
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "List");
                const detailIndex = categoryTotal[mainIndex].detail[subIndex].findIndex(item => 
                    item === prev.current.find(item => item.main === "Recipe" && item.sub === "List")?.detail);
                categoryChange(mainIndex, subIndex, detailIndex, 0);
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    )

    return(
        <View style={styles.container}>
            <ListBox/>
        </View>
    )
}

export default Page;