//기타
import React from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

interface selectedBoardType{
    boardId: string;
    title: string;
    content: string;
}

interface categoryValueType{
    main: string;
    sub: string;
    detail: string;
    detail_1: string;
}

interface categoryTotalType{
    main: string;
    sub: string[];
    detail: string[][];
    detail_1: string[][][];
}

interface Props{
    // pageSubValue: React.RefObject<string>;
    selectedBoard: React.RefObject<selectedBoardType>;
    // setBoardCg: React.Dispatch<React.SetStateAction<string>>;
    // pageRenderTrig: () => void;
    categoryValue: categoryValueType;
    categoryTotal: categoryTotalType[];
    setCategoryValue: React.Dispatch<React.SetStateAction<categoryValueType>>;
}

function InfoWriteTop(props: Props): React.JSX.Element{
    const {selectedBoard, categoryValue, setCategoryValue, categoryTotal} = props;

    const pressBtn = (type: string) => {
        let mainIndex = categoryValue.main === "Community" ? 
                            3 : categoryValue.main === "MyPage" ? 
                            2 : categoryValue.main === "Recipe" ? 
                            1 : 0;
        if(type === "back"){
            setCategoryValue((prev) => ({
                ...prev,
                sub: categoryTotal[mainIndex].sub[0],
                detail: categoryTotal[mainIndex].sub[0][0],
                detail_1: categoryTotal[mainIndex].detail_1[0][0][0]
            }));
            // categoryValue.current.sub = categoryTotal[mainIndex].sub[0];
            // categoryValue.current.detail = categoryTotal[mainIndex].sub[0][0];
            // categoryValue.current.detail_1 = categoryTotal[mainIndex].detail_1[0][0][0];
            // pageSubValue.current = "default";
            // pageRenderTrig();
            // setBoardCg("Notice");
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
            {categoryValue.sub === "Info" && <Text style={[styles.center, styles.title]}>{selectedBoard.current.title}</Text>}
            {categoryValue.sub === "Write" && <TextInput style={[styles.center, styles.inputTitle]} placeholder="- title -"/>}
            <Pressable onPress={() => pressBtn("like")}>
                {categoryValue.sub === "Info" && 
                    (categoryValue.main === "Community" ? 
                        <Image style={styles.icon} source={require("../../../assets/image/thumb.png")}/> :
                        <Image style={styles.icon} source={require("../../../assets/image/unlike.png")}/>
                    )}
                {categoryValue.sub === "Write" && <Image style={styles.icon} source={require("../../../assets/image/upload.png")}/>}
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