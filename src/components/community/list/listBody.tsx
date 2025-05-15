//기타
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Pressable, StyleSheet, Text, View } from "react-native"

//Type
import { NavigateType } from "../../../types/navigateTypes";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

//컴포넌트
import ListScroll from "./listScroll";
import ListSwitch from "../../common/body/listSwitch";

//Context
import { useCommon } from "../../../context/commonContext";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";
import { RootState } from "../../../redux/store";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

function ListBody(): React.JSX.Element{
    const [listState, setListState] = useState(false);
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const dispatch = useDispatch();

    const navigation = useNavigation<NavigationProps>();

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Community");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "List");
        const nextValue = {
            main: categoryTotal[mainIndex].main,
            sub: categoryTotal[mainIndex].sub[subIndex],
            detail: categoryTotal[mainIndex].detail[subIndex][0],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0]
        };

        if((nextValue.main !== categoryValue.main) || (nextValue.sub !== categoryValue.sub)){
            dispatch(setCategoryValue({
                ...categoryValue,
                ...nextValue
            }));
        }
    });

    const goWrite = () => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Community");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Write");

        dispatch(setCategoryValue({
            ...categoryValue,
            detail: categoryTotal[mainIndex].main,
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0]
        }));
        
        navigation.navigate("Community", {
            screen: "Write",
        });
    }

    return(
        <View style={styles.container}>
            <TextInput style={styles.searchBox} placeholder="입력하세요..."/>
            {categoryValue.main === "Community" &&
                <ListSwitch
                    categoryValue={categoryValue} 
                    setListState={setListState}
                    categoryTotal={categoryTotal}/>}
            <View style={styles.head}>
                <Pressable style={styles.element} onPress={() => goWrite()}>
                    <Text style={styles.txt}>글쓰기</Text>
                </Pressable>
            </View>
            <ListScroll/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "white",
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
    },
    head: {
        width: "100%",
        height: 25,
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 10,
    },
    element:{
        width: 70,
        marginLeft: "4%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "rgba(67, 67, 67, 1)"
    },
    txt:{
        fontFamily: "Jua-Regular",
    }
});

export default ListBody;