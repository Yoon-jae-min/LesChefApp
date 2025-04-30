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
    // pageRenderTrig: () => void;
    detailIndex: number;
    detailIndex_1: number;
    // elements: string[],
    // subCg: number,
    // setSubCg: React.Dispatch<React.SetStateAction<number>>
}

function SelectSubCg(props: Props): React.JSX.Element{
    const {categoryValue, categoryTotal, setCategoryValue, detailIndex, detailIndex_1} = props;
    // const [selected, setSelected] = useState(0);
    // const detailIndex = categoryTotal[1].detail[0].findIndex((item) => item === categoryValue.current.detail);
    // const detailIndex_1 =  categoryTotal[1].detail_1[0][detailIndex].findIndex((item) => item === categoryValue.current.detail_1);
    const elements = categoryTotal[1].detail_1[0][detailIndex];

    // useEffect(() => {
    //     setSubCg(0);
    // }, [elements]);

    const touchMenu = (index: number) => {
        setCategoryValue((prev) => ({
            ...prev,
            detail_1: categoryTotal[1].detail_1[0][detailIndex][index]
        }))
        // categoryValue.current.detail_1 = categoryTotal[1].detail_1[0][detailIndex][index];
        // pageRenderTrig();
    }

    return(
        <View style={styles.container}>
            {elements.map((item, index) => (
                <React.Fragment key={index}>
                    <TouchableOpacity 
                        style={[styles.element, detailIndex_1 === index ? styles.selectE : styles.nonSelectE]}
                        onPress={() => touchMenu(index)}>
                        <Text style={[styles.txt, detailIndex_1 === index ? styles.selectT : styles.nonSelectT]}>{item}</Text>
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