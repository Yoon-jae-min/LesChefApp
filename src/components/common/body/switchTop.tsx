//기타
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface SwitchTopProps {
    elements: string[]
    setMainCg: React.Dispatch<React.SetStateAction<string>>
}

function SwitchTop(props: SwitchTopProps): React.JSX.Element{
    const {elements, setMainCg} = props;
    const [selectedValue, setSelectedValue] = useState(elements[0]);

    const ChangeMainCg = (value: string) => {
        setSelectedValue(value);
        setMainCg(value);
    }

    const pressArrow = (arrow: string, value : string) => {
        let indexSave = 0;

        elements.map((item, index) => {
            if(item === value){
                indexSave = index;
            }
        })

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

        ChangeMainCg(elements[indexSave]);
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={() => pressArrow("left", selectedValue)}>
                <Image source={require("../../../assets/image/leftArrow.png")}/>
            </Pressable>
            <RNPickerSelect
                style={pickerStyles}
                value={selectedValue}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                items={elements.map((item) => ({label: item, value: item}))}
                onValueChange={(value) => ChangeMainCg(value)}/>
            <Pressable onPress={() => pressArrow("right", selectedValue)}>
                <Image source={require("../../../assets/image/rightArrow.png")}/>
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
    arrowAll:{
        height: 50,
        aspectRatio: 1 / 1
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