//기타
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native"

//컴포넌트
import ListContainer from "./listContainer";

interface selectedBoardRef{
    boardId: string,
    title: string,
    content: string,
    userId: string,
    profileImg: string,
    time: string,
    viewCount: number,
}

interface pageBoardProps{
    boardCg: string;
    pageSubValue: React.RefObject<string>;
    pageRenderTrig: () => void;
    selectedBoard: React.RefObject<selectedBoardRef>;
}

function ListBody(props: pageBoardProps): React.JSX.Element{
    const {boardCg, pageSubValue, pageRenderTrig, selectedBoard} = props;

    const exList = [
        [
            {
                boardId: "11111",
                title: "공지1",
                userId: "admin2",
                profileImg: "",
                time: "",
                viewCount: 0,
            },
            {
                boardId: "22222",
                title: "반갑습니다",
                userId: "admin2",
                profileImg: "",
                time: "",
                viewCount: 0,
            },
            {
                boardId: "33333",
                title: "이벤트1",
                userId: "admin1",
                profileImg: "",
                time: "",
                viewCount: 0,
            }
        ],
        [
            {
                boardId: "!11111",
                title: "테스트--------",
                userId: "woasl",
                profileImg: "",
                time: "",
                viewCount: 0,
            },
            {
                boardId: "!22222",
                title: "자유 게시판",
                userId: "free",
                profileImg: "",
                time: "",
                viewCount: 0,
            },
            {
                boardId: "!33333",
                title: "안녕하세요!!!!!!",
                userId: "hello123",
                profileImg: "",
                time: "",
                viewCount: 0,
            },
            {
                boardId: "!44444",
                title: "좋은하루입니다",
                userId: "tleod1818",
                profileImg: "",
                time: "",
                viewCount: 0,
            },
        ]
        
    ];
    const [listValue, setListValue] = useState(exList[0]);

    useEffect(() => {
        if(boardCg === "Notice"){
            setListValue(exList[0]);
        }else if(boardCg === "Board"){
            setListValue(exList[1]);
        }
    }, [boardCg]);

    const goWrite = () => {
        pageSubValue.current = "Write";
        pageRenderTrig();
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
                boardCg={boardCg} 
                pageSubValue={pageSubValue} 
                pageRenderTrig={pageRenderTrig} 
                selectedBoard={selectedBoard}/>
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