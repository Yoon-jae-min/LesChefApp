//기타
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

//style
import styles from "@styles/myPage/body/recipeWrite/step/stepInput.style";
import StepUnit from "./stepUnit";

function StepInput(): React.JSX.Element{
    const [stepUnit, setStepUnit] = useState([]);

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Step</Text>
            {stepUnit.map(item => (
                <StepUnit/>
            ))}
            <Pressable style={styles.addBtnBox}>
                <Image style={styles.addBtn} source={require("../../../../../assets/image/addUnit.png")}/>
            </Pressable>
        </View>
    )
}

export default StepInput;