//기타
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

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

interface Props {
    // elements: string[]
    // setSelectCg: React.Dispatch<React.SetStateAction<string>>
    categoryValue: categoryValueType;
    categoryTotal: categoryTotalType[];
    setCategoryValue: React.Dispatch<React.SetStateAction<categoryValueType>>;
    // pageRenderTrig: () => void;
}

function SwitchTop(props: Props): React.JSX.Element{
    const {categoryValue, categoryTotal, setCategoryValue} = props;
    // const [selectedValue, setSelectedValue] = useState(elements[0]);
    const elements = categoryValue.main === "Recipe" ? categoryTotal[1].detail[0] : categoryTotal[3].detail[0];

    const indexCount = (value: string) => {
        return elements.findIndex((item) => item === value);
    }

    const switchMenu = (arrow: string, value: string) => {
        let indexSave = indexCount(value);

        if(arrow === "left"){
            if(indexSave === 0) {
                indexSave = elements.length - 1;
            }else{
                indexSave -= 1;
            }
        }else if(arrow === "right"){
            if(indexSave === elements.length - 1){
                indexSave = 0;
            }else{
                indexSave += 1;
            }
        }
        setCategoryValue((prev) => ({
            ...prev,
            detail: elements[indexSave],
            detail_1: categoryValue.main === "Recipe" ?
                        categoryTotal[1].detail_1[0][indexSave][0] : 
                        categoryTotal[3].detail_1[0][indexSave][0]
        }))
        // categoryValue.current.detail = elements[indexSave];
        // categoryValue.current.detail_1 = categoryValue.current.main === "Recipe" ?
        //                                 categoryTotal[1].detail_1[0][indexSave][0] : 
        //                                 categoryTotal[3].detail_1[0][indexSave][0];
        // pageRenderTrig();
        // setSelectedValue(value);
        // setSelectCg(value);
    }

    // const pressArrow = (arrow: string, value : string) => {
    //     let indexSave = indexCount(value);

    //     if(arrow === "left"){
    //         if(indexSave === 0) {
    //             indexSave = elements.length - 1;
    //         }else{
    //             indexSave -= 1;
    //         }
    //     }else if(arrow === "right"){
    //         if(indexSave === elements.length - 1){
    //             indexSave = 0;
    //         }else{
    //             indexSave += 1;
    //         }
    //     }
    //     switchMenu(elements[indexSave]);
    // }

    return(
        <View style={styles.container}>
            <Pressable onPress={() => switchMenu("left", categoryValue.detail)}>
                <Image style={styles.arrow} source={require("../../../assets/image/leftArrow.png")}/>
            </Pressable>
            <RNPickerSelect
                style={pickerStyles}
                // value={selectedValue}
                value={categoryValue.detail}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                items={categoryTotal
                    .find((item) => item.main === categoryValue.main)
                    ?.detail[0].map((item) => ({label: item, value: item})) ?? []
                }
                // items={elements.map((item) => ({label: item, value: item}))}
                onValueChange={(value) => switchMenu("center", value)}/>
            <Pressable onPress={() => switchMenu("right", categoryValue.detail)}>
                <Image style={styles.arrow} source={require("../../../assets/image/rightArrow.png")}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "93%",
    },
    arrow:{
        width: 40,
        height: 40
    }
})

const pickerStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: "Jua-Regular",
        fontSize: 22,
        padding: 12,
        width: 250,
        height: 50,
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
    },
    inputAndroid: {
        fontFamily: "Jua-Regular",
        fontSize: 22,
        padding: 12,
        width: 250,
        height: 50,
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
    },
})

export default SwitchTop;