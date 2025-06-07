//기타
import React, { useCallback } from "react";
import { View, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";

//Component
import Issue from "./issue";
import FoodPrice from "./foodPrice";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Context
import { useCommon } from "../../context/commonContext";
import { useMain } from "../../context/mainContext";

//style
import styles from "@styles/main/page.style";

//hooks
import { useCategory } from "../../hooks/useCategory";

function PageMain(): React.JSX.Element{
    const {categoryTotal, prev, success} = useCommon();
    const {categoryChange} = useCategory();
    // const {success} = useMain();

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "Main");
                categoryChange(mainIndex, 0, 0, 0);
                prev.current = [];
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    );

    return(
        <View style={styles.container}>
            <TextInput style={styles.searchBox} placeholder="입력하세요..."/>
            <ScrollView style={styles.container} contentContainerStyle={styles.containerAlign}>
                <Issue/>
                <FoodPrice/>
            </ScrollView>
        </View>
    )
}

export default PageMain;