//기타
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

//style
import styles from "@styles/myPage/body/storage/itemUnit.style";

type Props = {
    item: {name: string, amount: string, expire: string}
}

function ItemUnit(props: Props): React.JSX.Element{
    const {item} = props;

    return(
        <View style={styles.container}>
            <View style={styles.imgBox}>
                <Image source={require("../../../../assets/image/noImage.png")} style={styles.itemImg}/>
            </View>
            <View style={styles.infoBox}>
                <View style={styles.nameBox}>
                    <Text style={styles.infoText}>{item.name}</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.centerBox}>
                    <Text style={styles.infoText}>{item.amount}</Text>
                    <Text style={styles.infoText}>{item.expire}</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.btnBox}>
                    <Pressable>
                        <Image source={require("../../../../assets/image/write.png")} style={styles.btnImg}/>
                    </Pressable>
                    <Pressable>
                        <Image source={require("../../../../assets/image/cancel_DG.png")} style={styles.btnImg}/>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default ItemUnit;