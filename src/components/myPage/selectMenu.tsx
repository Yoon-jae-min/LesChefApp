//기타
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CategoryTotalType, CategoryValueType } from "../../types/commonTypes";
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../redux/commonSlice";

type Props = {
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
    setCategoryTrig: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectMenu(props: Props): React.JSX.Element{
    const {categoryValue, categoryTotal, setCategoryTrig} = props;
    const dispatch = useDispatch();

    const selectMenu = (index: number) => {
        dispatch(setCategoryValue({
            ...categoryValue,
            sub: categoryTotal[2].sub[index],
            detail: categoryTotal[2].detail[index][0],
            detail_1: categoryTotal[2].detail_1[index][0][0]
        }))
        setCategoryTrig((prev) => (!prev));
    }

    return(
        <View style={styles.container}>
            {categoryTotal[2].sub.filter((item, index) => index < 4).map((item, index) => (
                <React.Fragment key={index}>
                    <TouchableOpacity
                        style={styles.element}
                        onPress={() => selectMenu(index)}>
                        <Text style={categoryValue.sub === item ? styles.selected : styles.nonSelected}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                    {index < 3 && <View style={styles.sepaator}/>}
                </React.Fragment>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "90%",
        height: 44,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: 5,
        marginBottom: 20,
        borderColor: "rgba(81, 81, 81, 1)",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    element:{
        width: "25%",
        height: "75%",
        justifyContent: "center",
        alignItems: "center",
    },
    sepaator:{
        width: 1,
        height: "75%",
        backgroundColor: "rgba(160, 160, 160, 1)",
    },
    selected:{
        fontFamily: "SourceSerif4-Bold"
    },
    nonSelected:{
        color: "rgba(160, 160, 160, 1)",
        fontFamily: "SourceSerif4-Light"
    }
})

export default SelectMenu;