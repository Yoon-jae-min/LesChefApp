//기타
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

//style
import styles from "@styles/myPage/body/recipeWrite/step/stepInput.style";
import StepUnit from "./stepUnit";

//type
import { StepType } from "../../../../../types/recipeTypes";

type Props = {
    setImgSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
    imgInputType: React.RefObject<{type: string; index: number;}>;
}

function StepInput(props: Props): React.JSX.Element{
    const {setImgSelectOpen, imgInputType} = props;
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
                <StepUnit 
                    key={index} 
                    unitIndex={index} 
                    stepUnit={item} 
                    removeElement={removeElement} 
                    inputElement={inputElement}
                    setImgSelectOpen={setImgSelectOpen}
                    imgInputType={imgInputType}/>
            ))}
            <Pressable style={styles.addBtnBox} onPress={addElement}>
                <Image style={styles.addBtn} source={require("../../../../../assets/image/addUnit.png")}/>
            </Pressable>
        </View>
    )
}

export default StepInput;