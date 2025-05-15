//기타
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

//Component
import SelectMyMenu from "./selectMenu";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Context
import { useCommon } from "../../context/commonContext";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setCategoryValue } from "../../redux/commonSlice";

function PageMy(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const dispatch = useDispatch();
    const [categoryTrig, setCategoryTrig] = useState(false);

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Info");

        const nextValue = {
            main: categoryTotal[mainIndex].main,
            sub: categoryTotal[mainIndex].sub[subIndex],
            detail: categoryTotal[mainIndex].detail[subIndex][0],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0],
        }

        if(nextValue.main !== categoryValue.main){
            dispatch(setCategoryValue({
                ...categoryValue,
                ...nextValue
            }));
        }
    });

    return(
        <View style={styles.container}>
            <SelectMyMenu 
                categoryValue={categoryValue} 
                categoryTotal={categoryTotal} 
                setCategoryTrig={setCategoryTrig}/>
            <ScrollView style={styles.content}>

            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white"
    },
    content:{
        flex: 1,
        borderColor: "#E0A05E",
        borderWidth: 3,
    }
})

export default PageMy;