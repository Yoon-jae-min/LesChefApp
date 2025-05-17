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
            <Text>Step</Text>
            {steps.map((item, index) => (
                <View key={index}>
                    <Image source={require("../../../assets/image/noImage.png")}/>
                    <View>
                        <Text>{`Step.${item.stepNum}`}</Text>
                        <Text>{item.content}</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default StepBox;