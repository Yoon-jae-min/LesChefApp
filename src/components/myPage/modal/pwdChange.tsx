//기타
import React from "react";
import { Image, Text, TextInput, View } from "react-native";

//style
import styles from "@styles/myPage/modal/pwdChange.style";

function PwdChange(): React.JSX.Element{
    const label = ["new pwd", "check pwd"]

    return(
        <View style={styles.container}>
            {label.map((item, index) => 
                <View key={index} style={styles.pwdLineBox}>
                    <Text style={styles.pwdLabel}>{item}</Text>
                    <TextInput style={styles.pwdInput}/>
                </View>
            )}
            <Image style={styles.okImg} source={require("../../../assets/image/ok_BK.png")}/>
        </View>
    )
}

export default PwdChange;