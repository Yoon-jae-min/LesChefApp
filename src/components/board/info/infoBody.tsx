//기타
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SelectedBoardType } from "../../../types/boardTypes";
import { CategoryValueType, CategoryTotalType } from "../../../types/commonTypes";

//컴포넌트
import CommentBox from "../../common/body/commentBox";
import TitleTop from "../../common/body/titleTop";


type Props = {
    listType: React.RefObject<string>;
    selectedBoard: SelectedBoardType;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
    boardType: string;
}

function InfoBody(props: Props): React.JSX.Element{
    const {listType, categoryTotal, categoryValue, selectedBoard, boardType} = props;

    return(
        <View style={styles.container}>
            <TitleTop
                listType={listType}
                selectedTitle={selectedBoard.title} 
                categoryValue={categoryValue}
                categoryTotal={categoryTotal}/>
            <View style={boardType === "Board" ? styles.top : styles.topNotice}>
                {boardType === "Board" && 
                    <View style={styles.profileBox}>
                        <Image style={styles.profileImg} source={require("../../../assets/image/profile.png")}/>
                        <View style={styles.profileTxt}>
                            <Text style={styles.userId}>{selectedBoard.userId}</Text>
                            <Text style={styles.writeTime}>{selectedBoard.time}</Text>
                        </View>
                    </View>}
                <View style={styles.viewBox}>
                    <Text style={styles.viewTxt}>{`조회수:`}</Text>
                </View>
            </View>
            <View style={styles.body}></View>
            <CommentBox comments={selectedBoard.comments}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: "rgba(204, 204, 204, 1)",
        width: "93%",
    },
    top:{
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 7,
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    topNotice: {
        marginTop: 5,
        marginBottom: 7,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    profileBox:{
        flexDirection: "row",
    },
    profileImg:{
        borderWidth: 1,
        borderColor: "rgba(204, 204, 204, 1)",
        borderRadius: 50,
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    profileTxt:{
        marginLeft: 10,
    },
    userId:{

    },
    writeTime:{

    },
    viewBox:{

    },
    viewTxt:{

    },
    body:{

    }
})

export default InfoBody;