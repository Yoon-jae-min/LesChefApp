//기타
import React, { useCallback } from "react";
import { View } from "react-native";

//style
import styles from "@styles/recipe/info/page.style";

//Component
import InfoBox from "./infoBox";

//Context
import { useCommon } from "../../../context/commonContext";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//hooks
import { useCategory } from "../../../hooks/useCategory";

function Page(): React.JSX.Element{
    const {categoryTotal, success} = useCommon();
    const {categoryChange} = useCategory();

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "Recipe");
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Info");
                categoryChange(mainIndex, subIndex, 0, 0);
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    )

    return(
        <View style={styles.container}>
            <InfoBox/>
        </View>
    )
}

export default Page;