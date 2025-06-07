//기타
import React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

//style
import styles from "@styles/myPage/body/recipeWrite/step/stepUnit.style";

//type
import { StepType } from "../../../../../types/recipeTypes";

type Props = {
    stepUnit: StepType;
    unitIndex: number;
    removeElement: (index: number) => void;
    inputElement: (index: number, value: StepType) => void;
}

function StepUnit(props: Props): React.JSX.Element{
    const {stepUnit, unitIndex, removeElement, inputElement} = props;

    return(
        <View style={styles.container}>
            <View style={styles.leftBox}>
                <Image style={styles.imgInput}/>
            </View>
            <View style={styles.rightBox}>
                <View style={styles.numImgBox}>
                    <Text style={styles.numText}>{`Step.${stepUnit.stepNum}`}</Text>
                    <Pressable onPress={() => removeElement(unitIndex)}>
                        <Image style={styles.removeImg} source={require("../../../../../assets/image/remove.png")}/>
                    </Pressable>
                </View>
                <TextInput 
                    value={stepUnit.content}
                    multiline 
                    style={styles.contentInput} 
                    onChangeText={(text) => 
                        inputElement(unitIndex, { stepNum: stepUnit.stepNum, imgUrl: stepUnit.imgUrl, content: text})}/>
            </View>
        </View>
    )
}

export default StepUnit;