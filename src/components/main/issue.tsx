//기타
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Issue(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Issue</Text>
            <Text style={styles.example}>{`공지사항 또는\n요리나 음식 관련 뉴스 정보\n표시 예정 구역`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "93%",
        marginTop: 5,
    },
    title:{
        fontFamily: "Kavoon-Regular",
        fontSize: 20,
    },
    example:{
        textAlign: "center",
        textAlignVertical: "center",
        height: 1000,
    }
})

export default Issue;