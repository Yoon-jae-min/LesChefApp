//기타
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

//컴포넌트
import SwitchTop from "../common/body/switchTop";
import ListBody from "./listBody";
import InfoWriteTop from "../common/body/infoWriteTop";
import InfoBody from "./infoBody";
import WriteBody from "./writeBody";

//임시 데이터
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

interface PageProps{
    categoryValue: categoryValueType;
    categoryTotal: categoryTotalType[];
    setCategoryValue: React.Dispatch<React.SetStateAction<categoryValueType>>;
}

function PageBoard(props: PageProps): React.JSX.Element{
    const {categoryValue, categoryTotal, setCategoryValue} = props;
    const [boardCg, setBoardCg] = useState("Notice");
    const listValue = categoryValue.detail === "Notice" ? exList[0] : exList[1];

    //예시 데이터 추후 제거예정
    const selectedBoard = useRef({
        boardId: "",
        title: "",
        content: "",
        userId: "",
        profileImg: "",
        time: "",
        viewCount: 0,
    });

    const commentList = useRef([]);

    return(
        <View style={styles.container}>
            {categoryValue.sub === "List" ? 
                <React.Fragment>
                    <SwitchTop categoryValue={categoryValue} categoryTotal={categoryTotal} setCategoryValue={setCategoryValue}/>
                    <ListBody 
                        listValue={listValue}
                        selectedBoard={selectedBoard}
                        categoryValue={categoryValue}
                        categoryTotal={categoryTotal}
                        setCategoryValue={setCategoryValue}/>
                </React.Fragment> :
                <React.Fragment>
                    <InfoWriteTop 
                        selectedBoard={selectedBoard} 
                        categoryValue={categoryValue}
                        categoryTotal={categoryTotal}
                        setCategoryValue={setCategoryValue}/>
                    {categoryValue.sub === "Info" && <InfoBody
                        selectedBoard={selectedBoard}
                        commentList={commentList}
                        boardType={boardCg}/>}
                    {categoryValue.sub === "Write" && <WriteBody/>}
                </React.Fragment>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
    }
})

export default PageBoard;

