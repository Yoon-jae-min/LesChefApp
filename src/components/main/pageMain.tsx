//기타
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
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

function PageMain(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const dispatch = useDispatch();

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Main");

        const nextValue = {
            main: categoryTotal[mainIndex].main,
            sub: categoryTotal[mainIndex].sub[0],
            detail: categoryTotal[mainIndex].detail[0][0],
            detail_1: categoryTotal[mainIndex].detail_1[0][0][0]
        };

        if((nextValue.main !== categoryValue.main) || (nextValue.sub !== categoryValue.sub)){
            dispatch(setCategoryValue({
                ...categoryValue,
                ...nextValue
            }));
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

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white"
    },
    containerAlign:{
        alignItems: "center"
    },
    searchBox:{
        width: "90%",
        height: 44,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: 5,
        marginBottom: 10,
        textAlign: "center",
        borderColor: "rgba(81, 81, 81, 1)",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        color: "rgba(160, 160, 160, 1)"
    }
})

export default PageMain;