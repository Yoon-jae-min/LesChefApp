//기타
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native"

//컴포넌트
import ListContainer from "./listScroll";

interface Element{
    boardId: string;
    title: string;
    userId: string;
    profileImg: string;
    time: string;
    viewCount: number;
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

interface selectedBoardRef{
    boardId: string,
    title: string,
    content: string,
    userId: string,
    profileImg: string,
    time: string,
    viewCount: number,
}

interface Props{
    listValue: Element[];
    selectedBoard: React.RefObject<selectedBoardRef>;
    categoryValue: categoryValueType;
    categoryTotal: categoryTotalType[];
    setCategoryValue: React.Dispatch<React.SetStateAction<categoryValueType>>;
}

function ListBody(props: Props): React.JSX.Element{
    const {listValue, selectedBoard, categoryValue, categoryTotal, setCategoryValue} = props;

    const goWrite = () => {
        setCategoryValue((prev) => ({
            ...prev,
            detail: "Write"
        }))
    }

    return(
        <View style={styles.container}>
            <View style={styles.head}>
                <Pressable style={styles.element} onPress={() => goWrite()}>
                    <Text style={styles.txt}>글쓰기</Text>
                </Pressable>
            </View>
            <ListContainer 
                listValue={listValue} 
                selectedBoard={selectedBoard}
                categoryValue={categoryValue}
                categoryTotal={categoryTotal}
                setCategoryValue={setCategoryValue}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "93%",
    },
    head: {
        width: "100%",
        height: 25,
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 10,
    },
    element:{
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "rgba(67, 67, 67, 1)"
    },
    txt:{
        fontFamily: "Jua-Regular",
    }
});

export default ListBody;