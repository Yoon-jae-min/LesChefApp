//기타
import React from "react";
import { View, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";

//Component
import Issue from "./issue";
import FoodPrice from "./foodPrice";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setCategoryValue } from "../../redux/commonSlice";
import { RootState } from "../../redux/store";

//Context
import { useCommon } from "../../context/commonContext";
import { useMain } from "../../context/mainContext";

//style
import styles from "@styles/main/page.style";

function PageMain(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const {focus} = useMain();
    const dispatch = useDispatch();

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Main");
        const nextValue = {
            main: categoryTotal[mainIndex].main,
            sub: categoryTotal[mainIndex].sub[0],
            detail: categoryTotal[mainIndex].detail[0][0],
            detail_1: categoryTotal[mainIndex].detail_1[0][0][0]
        };

        if(nextValue.main !== categoryValue.main){
            if(!focus.current){
                dispatch(setCategoryValue({
                    ...categoryValue,
                    ...nextValue
                }));
                focus.current = !focus.current;
            }else{
                focus.current = !focus.current;
            }
        }
    });

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