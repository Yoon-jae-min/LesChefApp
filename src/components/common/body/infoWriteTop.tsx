//기타
import React from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

interface selectedBoardType{
    boardId: string;
    title: string;
    content: string;
}

interface PageProps{
    pageSubValue: React.RefObject<string>;
    selectedBoard: React.RefObject<selectedBoardType>;
    setBoardCg: React.Dispatch<React.SetStateAction<string>>;
    pageRenderTrig: () => void;
}

function InfoWriteTop(props: PageProps): React.JSX.Element{
    const {pageSubValue, selectedBoard, setBoardCg, pageRenderTrig} = props;

    const pressBtn = (type: string) => {
        if(type === "back"){
            pageSubValue.current = "default";
            pageRenderTrig();
            setBoardCg("Notice");
        }else if(type === "like"){
            Toast.show({
                type: "info",
                text1: "좋아요 기능 추가 예정",
                position: "bottom",
            })
        }
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={() => pressBtn("back")}>
                <Image style={styles.icon} source={require("../../../assets/image/back.png")}/>
            </Pressable>
            {pageSubValue.current === "Info" && <Text style={[styles.center, styles.title]}>{selectedBoard.current.title}</Text>}
            {pageSubValue.current === "Write" && <TextInput style={[styles.center, styles.inputTitle]} placeholder="- title -"/>}
            <Pressable onPress={() => pressBtn("like")}>
                <Image style={styles.icon} source={require("../../../assets/image/upload.png")}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "93%",
    },
    center:{
        fontFamily: "Jua-Regular",
        width: 250,
        height: 50,
        backgroundColor: "white",
        textAlign: "center",
        textAlignVertical: "center",
    },
    title:{
        color: "black",
        fontSize: 22,
        lineHeight: 22,
        padding: 12,
    },
    inputTitle:{
        borderWidth: 1,
        borderColor: "rgba(160, 160, 160, 1)",
        color: "rgba(160, 160, 160, 1)",
        borderRadius: 5,
        height: 37,
        fontSize: 15,
    },
    icon:{
        height: 40,
        width: 40
    }
})

export default InfoWriteTop;