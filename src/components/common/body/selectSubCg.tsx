//기타
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";

//Redux
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";

type Props = {
    categoryTotal: CategoryTotalType[];
    categoryValue: CategoryValueType;
    setListState: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectSubCg(props: Props): React.JSX.Element{
    const { categoryTotal, categoryValue, setListState} = props;
    const detailIndex = categoryTotal[1].detail[0].findIndex(item => item === categoryValue.detail);
    const dispatch = useDispatch();
    const elements = categoryTotal[1].detail_1[0][detailIndex];

    const touchMenu = (index: number) => {
        dispatch(setCategoryValue({
            ...categoryValue,
            detail_1: categoryTotal[1].detail_1[0][detailIndex][index]
        }));

        setListState((prev) => (!prev));
    }

    return(
        <View style={styles.container}>
            {elements?.map((item, index) => (
                <React.Fragment key={index}>
                    <TouchableOpacity 
                        style={[styles.element, categoryValue.detail_1 === item ? styles.selectE : styles.nonSelectE]}
                        onPress={() => touchMenu(index)}>
                        <Text style={[styles.txt, categoryValue.detail_1 === item ? styles.selectT : styles.nonSelectT]}>{item}</Text>
                    </TouchableOpacity>
                </React.Fragment>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "93%",
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
        marginRight: 5,
        borderWidth: 1,
        borderColor: "rgba(67, 67, 67, 1)"
    },
    selectE:{
        backgroundColor: "rgba(67, 67, 67, 1)",
    },
    nonSelectE:{
        backgroundColor: "rgba(255, 255, 255, 1)",
    },
    txt:{
        fontFamily: "Jua-Regular",
    },
    selectT:{
        color: "rgba(255, 255, 255, 1)"
    },
    nonSelectT:{
        color: "rgba(0, 0, 0, 1)"
    }
})

export default SelectSubCg;