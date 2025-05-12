//기타
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native"
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";
import { SelectedBoardType } from "../../../types/boardTypes";
import { NavigateType } from "../../../types/navigateTypes";

//컴포넌트
import ListScroll from "./listScroll";
import ListSwitch from "../../common/body/listSwitch";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    listType: React.RefObject<string>;
    setSelectedBoard: React.Dispatch<React.SetStateAction<SelectedBoardType>>;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
    // setCategoryValue: React.Dispatch<React.SetStateAction<CategoryValueType>>;
}

function ListBody(props: Props): React.JSX.Element{
    const {listType, categoryValue, categoryTotal, setSelectedBoard} = props;
    const [listState, setListState] = useState(false);
    const dispatch = useDispatch();

    const navigation = useNavigation<NavigationProps>();

    const goWrite = () => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Board");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Write");

        dispatch(setCategoryValue({
            ...categoryValue,
            detail: categoryTotal[mainIndex].main,
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0]
        }));
        
        navigation.navigate("Board", {
            screen: "Write",
        })
    }

    return(
        <View style={styles.container}>
            {categoryValue.main === "Board" &&
                <ListSwitch
                    listType={listType} 
                    categoryValue={categoryValue} 
                    setListState={setListState}
                    categoryTotal={categoryTotal}/>}
            <View style={styles.head}>
                <Pressable style={styles.element} onPress={() => goWrite()}>
                    <Text style={styles.txt}>글쓰기</Text>
                </Pressable>
            </View>
            <ListScroll
                listType={listType}
                categoryValue={categoryValue}
                categoryTotal={categoryTotal}
                setSelectedBoard={setSelectedBoard}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "93%",
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