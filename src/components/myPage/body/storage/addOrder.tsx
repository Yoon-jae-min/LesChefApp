//기타
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

//style
import styles from "@styles/myPage/body/storage/addOrder.style";

function AddOrder(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <View style={styles.orderBox}>
                <Pressable>
                    <Text style={styles.orderText}>수량</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.orderText}>기한</Text>
                </Pressable>
            </View>
            <View style={styles.addBtnBox}>
                <Image style={styles.addBtnImg} source={require("../../../../assets/image/addUnit.png")}/>
            </View>
        </View>
    )
}

export default AddOrder;