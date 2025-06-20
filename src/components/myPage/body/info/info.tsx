//기타
import React, { useCallback } from "react";
import { Text, View } from "react-native";

//Context
import { useCommon } from "../../../../context/commonContext";

//style
import styles from "@styles/myPage/body/info/info.style";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

function Info(): React.JSX.Element{
    const {categoryTotal, success} = useCommon();
    const {categoryChange} = useCategory();

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Info");
                categoryChange(mainIndex, subIndex, 0, 0);
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    );

    return(
        <View style={styles.container}>
            <Text>info</Text>
        </View>
    )
}

export default Info;