//기타
import React from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";

function WriteBody(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <View style={styles.iconBox}>
                <Pressable>
                    <Image style={styles.icon} source={require("../../assets/image/addImg.png")}/>
                </Pressable>
                <View style={styles.alignBox}>
                    <Pressable>
                        <Image style={styles.icon} source={require("../../assets/image/textAlignLeft.png")}/>
                    </Pressable>
                    <Pressable>
                        <Image style={styles.icon} source={require("../../assets/image/textAlignCenter.png")}/>
                    </Pressable>
                    <Pressable>
                        <Image style={styles.icon} source={require("../../assets/image/textAlignRight.png")}/>
                    </Pressable>
                </View>
            </View>
            <TextInput style={styles.textInput}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "93%",
        alignItems: "center",
        marginTop: 7,
    },
    iconBox:{
        flexDirection: "row",
        width: "97%",
        height: 30,
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 3,
    },
    alignBox:{
        flexDirection: "row",
        height: 25,
        width: 85,
        justifyContent: "space-between"
    },
    icon:{
        width: 25,
        height: 25,
        resizeMode: "contain",
    },
    textInput:{
        borderWidth: 1,
        width: "100%",
        flex: 1,
        marginBottom: 7,
        borderRadius: 5,
    }
})

export default WriteBody;