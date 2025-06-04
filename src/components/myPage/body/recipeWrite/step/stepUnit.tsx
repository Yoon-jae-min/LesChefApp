//기타
import React from "react";
import { Image, Text, TextInput, View } from "react-native";

//style
import styles from "@styles/myPage/body/recipeWrite/step/stepUnit.style";

function StepUnit(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <View style={styles.leftBox}>
                <Image style={styles.imgInput}/>
            </View>
            <View style={styles.rightBox}>
                <Text style={styles.numText}>{`Step.1`}</Text>
                <TextInput multiline style={styles.contentInput}/>
            </View>
        </View>
    )
}

export default StepUnit;