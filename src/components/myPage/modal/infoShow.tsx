//기타
import React from "react";
import { Text, View } from "react-native";

//style
import styles from "@styles/myPage/modal/infoShow.style";

function InfoShow(): React.JSX.Element{
    const label = ["name", "email", "tel", "birth"];
    const value = ["윤재민", "jmyoon1994@naver.com", "010-6745-4643", "1994/07/08"];

    return(
        <View style={styles.container}>
            {label.map((item, index) => 
                <View key={index} style={styles.infoLineBox}>
                    <Text style={styles.infoLabel}>{item}</Text>
                    <Text style={styles.infoValue}>{value[index]}</Text>
                </View>
            )}
        </View>
    )
}

export default InfoShow;