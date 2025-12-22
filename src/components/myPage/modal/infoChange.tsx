//기타
import React from "react";
import { Image, Text, TextInput, View } from "react-native";

//style
import styles from "@styles/myPage/modal/infoChange.style";

function InfoChange(): React.JSX.Element{
    const label = ["name", "email", "tel", "birth"];

    return(
        <View style={styles.container}>
            {label.map((item, index) => 
                <View key={index} style={styles.infoLineBox}>
                    <Text style={styles.infoLabel}>{item}</Text>
                    <TextInput style={styles.infoInput}/>
                </View>
            )}
            <Image style={styles.okImg} source={require("../../../assets/image/ok_BK.png")}/>
        </View>
    )
}

export default InfoChange;