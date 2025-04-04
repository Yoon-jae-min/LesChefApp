//기타
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SelectSubCgProps{
    elements: string[]
}

function SelectSubCg(props: SelectSubCgProps): React.JSX.Element{
    const {elements} = props;
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        setSelected(0);
    }, [elements]);

    return(
        <View style={styles.container}>
            {elements.map((item, index) => (
                <React.Fragment key={index}>
                    <TouchableOpacity 
                        style={[styles.element, selected === index ? styles.selectE : styles.nonSelectE]}
                        onPress={() => setSelected(index)}>
                        <Text style={[styles.txt, selected === index ? styles.selectT : styles.nonSelectT]}>{item}</Text>
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