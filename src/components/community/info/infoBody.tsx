//기타
import React, { useCallback } from "react";
import { Image, Text, View } from "react-native";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Component
import CommentBox from "../../common/useElement/body/cmtBox";
import LikeTop from "../../common/useElement/top/likeTop";

//Context
import { useCommon } from "../../../context/commonContext";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ScrollView } from "react-native-gesture-handler";

//style
import styles from "@styles/community/info/infoBody.style";

//hooks
import { useCategory } from "../../../hooks/useCategory";


function InfoBody(): React.JSX.Element{
    const {categoryTotal, prev, success} = useCommon();
    const {categoryChange} = useCategory();
    const boardType = prev.current.find((item) => item.main === "Community" && item.sub === "List")?.detail;
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard);

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "Community");
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Info");
                categoryChange(mainIndex, subIndex, 0, 0);
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    );

    return(
        <View style={styles.container}>
            <LikeTop
                selectedTitle={selectedBoard.title} 
                categoryValue={categoryValue}
                categoryTotal={categoryTotal}/>
            <ScrollView contentContainerStyle={styles.scrollAlign} showsVerticalScrollIndicator={false}>
                <View style={[styles.top, boardType === "Board" ? styles.topBoard : styles.topNotice]}>
                    {boardType === "Board" ?
                        <View style={styles.profileBox}>
                            <Image style={styles.profileImg} source={require("../../../assets/image/profile.png")}/>
                            <View style={styles.profileTxt}>
                                <Text style={styles.userId}>{selectedBoard.userId}</Text>
                                <Text style={styles.writeTime}>{selectedBoard.time}</Text>
                            </View>
                        </View> :
                        <Text style={styles.writeTime}>{selectedBoard.time}</Text>
                    }
                    <View style={styles.viewBox}>
                        <Text style={styles.viewTxt}>{`조회수:  ${selectedBoard.viewCount}`}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={styles.content}>{selectedBoard.content}</Text>
                </View>
                <CommentBox comments={selectedBoard.comments}/>
            </ScrollView>
        </View>
    )
}

export default InfoBody;