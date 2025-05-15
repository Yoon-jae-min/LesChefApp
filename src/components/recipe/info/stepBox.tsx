//기타
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

//Type
import { StepType } from "../../../types/recipeTypes";

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

const styles = StyleSheet.create({
    container:{

    }
});

export default StepBox;