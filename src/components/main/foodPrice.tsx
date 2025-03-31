//기타
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function FoodPrice(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Food Price</Text>
            <Text style={styles.example}>{`식재료 가격(시세) 관련 정보\n표시 예정 구역`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "93%",
        marginTop: 10,
    },
    title:{
        fontFamily: "Kavoon-Regular",
        fontSize: 20,
    },
    example:{
        textAlign: "center",
        textAlignVertical: "center",
        height: 200,
    }
})

export default FoodPrice;