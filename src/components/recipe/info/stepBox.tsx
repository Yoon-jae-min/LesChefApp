//기타
import React from "react";
import { Image, Text, View } from "react-native";

//Type
import { StepType } from "../../../types/recipeTypes";

//style
import styles from "@styles/recipe/info/stepBox.style";

type Props = {
    steps: StepType[]
}

function StepBox(props: Props): React.JSX.Element{
    const {steps} = props;

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Step</Text>
            {steps.map((item, index) => (
                <View key={index} style={styles.unitBox}>
                    <Image source={require("../../../assets/image/noImage.png")} style={styles.img}/>
                    <View style={styles.descript}>
                        <Text style={styles.stepNum}>{`Step.${item.stepNum}`}</Text>
                        <Text style={styles.content}>{item.content}</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default StepBox;