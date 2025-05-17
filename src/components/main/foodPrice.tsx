//기타
import React from "react";
import { Text, View } from "react-native";

//style
import styles from "@styles/main/foodPrice.style";

function FoodPrice(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Food Price</Text>
            <Text style={styles.example}>{`식재료 가격(시세) 관련 정보\n표시 예정 구역`}</Text>
        </View>
    )
}

export default FoodPrice;