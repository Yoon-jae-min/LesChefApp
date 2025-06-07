//기타
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

//style
import styles from "@styles/myPage/body/recipeWrite/step/stepInput.style";
import StepUnit from "./stepUnit";

//type
import { StepType } from "../../../../../types/recipeTypes";

function StepInput(): React.JSX.Element{
    const [stepUnits, setStepUnits] = useState<StepType[]>([]);

    const addElement = () => {
        setStepUnits((prev) => [...prev, {stepNum: stepUnits.length + 1, imgUrl: "", content: ""}]);
    }

    const removeElement = (unitIndex: number) => {
        setStepUnits((prev) => 
            prev.filter((_, index) => index !== unitIndex).map((item, index) => ({...item, stepNum: index + 1}))
        );
    }
    
    const inputElement = (unitIndex: number, value: StepType) => {
        setStepUnits((prev) =>
            prev.map((item, index) => index === unitIndex ? value : item)
        );
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Step</Text>
            {stepUnits.map((item, index) => (
                <StepUnit key={index} unitIndex={index} stepUnit={item} removeElement={removeElement} inputElement={inputElement}/>
            ))}
            <Pressable style={styles.addBtnBox} onPress={addElement}>
                <Image style={styles.addBtn} source={require("../../../../../assets/image/addUnit.png")}/>
            </Pressable>
        </View>
    )
}

export default StepInput;