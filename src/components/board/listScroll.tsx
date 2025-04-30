//기타
import React from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Element{
    boardId: string;
    title: string;
    userId: string;
    profileImg: string;
    time: string;
    viewCount: number;
}

interface selectedBoardRef{
    boardId: string,
    title: string,
    content: string,
    userId: string,
    profileImg: string,
    time: string,
    viewCount: number,
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
    listValue: Element[];
    selectedBoard: React.RefObject<selectedBoardRef>;
    categoryValue: categoryValueType;
    categoryTotal: categoryTotalType[];
    setCategoryValue: React.Dispatch<React.SetStateAction<categoryValueType>>;
}

function ListScroll(props: Props): React.JSX.Element{
    const {listValue, selectedBoard, categoryValue, categoryTotal, setCategoryValue} = props;

    const pressBoard = (boardId: string, title: string, userId: string) => {
        selectedBoard.current = {
            boardId: boardId,
            title: title,
            content: "하이요!!",
            userId: userId,
            profileImg: "",
            time: "2025.04.22 00:54:32",
            viewCount: 0,
        }
        
        setCategoryValue((prev) => ({
            ...prev,
            sub: categoryTotal[3].sub[1],
            detail: categoryTotal[3].detail[1][0],
            detail_1: categoryTotal[3].detail_1[1][0][0]
        }));
    }

    return(
        <View style={styles.container}>
            {listValue.map((item, index) => (
                <Pressable key={index} style={styles.element} onPress={() => pressBoard(item.boardId, item.title, item.userId)}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.bottomBox}>
                        {categoryValue.detail === "Notice" ? 
                            <View></View> :
                            <React.Fragment>
                                <View style={styles.leftInfo}>
                                    <Image style={styles.bottomImg} source={require("../../assets/image/profile.png")}/>
                                    <Text style={styles.bottomTxt}>{item.userId}</Text>
                                </View>
                                <View style={styles.rightInfo}></View>
                            </React.Fragment>}
                    </View>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    element:{
        width: "100%",
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 3,
        marginBottom: 3,
        justifyContent: "space-between"
    },
    title:{
        width: "80%",
        marginLeft: 10,
        marginTop: 5,
    },
    bottomBox:{
        marginBottom: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftInfo:{
        height: 15,
        flexDirection: "row",
        marginLeft: 7
    },
    rightInfo:{
        height: 15,
        marginRight: 7,
        flexDirection: "row",
        borderWidth: 1
    },
    bottomImg:{
        width: 13,
        height: 13,
        marginRight: 5,
    },
    bottomTxt:{
        height: 13,
        fontSize: 10,
        color: "rgba(67, 67, 67, 1)"
    }
});

export default ListScroll;