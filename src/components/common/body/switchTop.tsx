//기타
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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

    return(
        <View style={styles.container}>
            <Image source={require("../../../assets/image/leftArrow.png")}/>
            <RNPickerSelect
                style={pickerStyles}
                value={selectedValue}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                items={elements.map((item) => ({label: item, value: item}))}
                onValueChange={(value) => ChangeMainCg(value)}/>
            <Image source={require("../../../assets/image/rightArrow.png")}/>
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