//기타
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface categoryValueType{
    main: string;
    sub: string;
    detail: string;
    detail_1: string;
}

interface categoryTotalType{
    main: string;
    sub: string[];
    detail: string[][];
    detail_1: string[][][];
}

interface Props{
    categoryValue: categoryValueType;
    categoryTotal: categoryTotalType[];
    setCategoryValue: React.Dispatch<React.SetStateAction<categoryValueType>>;
}

function SelectMyMenu(props: Props): React.JSX.Element{
    const {categoryValue, categoryTotal, setCategoryValue} = props;

    const selectMenu = (index: number) => {
        setCategoryValue((prev) => ({
            ...prev,
            sub: categoryTotal[2].sub[index],
            detail: categoryTotal[2].detail[index][0],
            detail_1: categoryTotal[2].detail_1[index][0][0]
        }));
    }

    return(
        <View style={styles.container}>
            {categoryTotal[2].sub.map((item, index) => (
                <React.Fragment key={index}>
                    <TouchableOpacity
                        style={styles.element}
                        onPress={() => selectMenu(index)}>
                        <Text style={categoryValue.sub === item ? styles.selected : styles.nonSelected}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                    {index !== categoryTotal[2].sub.length - 1 && <View style={styles.sepaator}/>}
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

export default SelectMyMenu;