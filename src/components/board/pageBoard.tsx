//기타
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

//컴포넌트
import SwitchTop from "../common/body/switchTop";
import ListBody from "./ListBody";
import InfoWriteTop from "../common/body/infoWriteTop";
import InfoBody from "./infoBody";
import WriteBody from "./writeBody";

interface PageProps{
    pageSubValue: React.RefObject<string>;
    pageRenderTrig: () => void;
}

function PageBoard(props: PageProps): React.JSX.Element{
    const {pageSubValue, pageRenderTrig} = props;
    const elements = ["Notice", "Board"];
    const [boardCg, setBoardCg] = useState("Notice");
    const selectedBoard = useRef({
        boardId: "",
        title: "",
        content: "",
        userId: "",
        profileImg: "",
        time: "",
        viewCount: 0,
    })
    const commentList = useRef([]);

    return(
        <View style={styles.container}>
            {pageSubValue.current === "default" ? 
                <React.Fragment>
                    <SwitchTop elements={elements} setSelectCg={setBoardCg}/>
                    <ListBody 
                        boardCg={boardCg} 
                        pageSubValue={pageSubValue} 
                        pageRenderTrig={pageRenderTrig} 
                        selectedBoard={selectedBoard}/>
                </React.Fragment> :
                <React.Fragment>
                    <InfoWriteTop 
                        setBoardCg={setBoardCg}
                        pageSubValue={pageSubValue} 
                        selectedBoard={selectedBoard} 
                        pageRenderTrig={pageRenderTrig}/>
                    {pageSubValue.current === "Info" && <InfoBody
                        selectedBoard={selectedBoard}
                        commentList={commentList}
                        boardType={boardCg}/>}
                    {pageSubValue.current === "Write" && <WriteBody/>}
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

