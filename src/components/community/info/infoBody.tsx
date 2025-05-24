//기타
import React from "react";
import { Image, Text, View } from "react-native";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Component
import CommentBox from "../../common/useElement/cmtBox";
import LikeTop from "../../../components/common/useElement/likeTop";

//Context
import { useCommon } from "../../../context/commonContext";
import { useCommunity } from "../../../context/communityContext";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCategoryValue } from "../../../redux/commonSlice";
import { ScrollView } from "react-native-gesture-handler";

//style
import styles from "@styles/community/info/infoBody.style";


function InfoBody(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const {communityDetail, focus} = useCommunity();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard);
    const dispatch = useDispatch();

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Community");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Info");
        const nextValue = {
            main: categoryTotal[mainIndex].main,
            sub: categoryTotal[mainIndex].sub[subIndex],
            detail: categoryTotal[mainIndex].detail[subIndex][0],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0]
        };

        if((nextValue.main !== categoryValue.main) || (nextValue.sub !== categoryValue.sub)){
            if(!focus.current){
                dispatch(setCategoryValue({
                    ...categoryValue,
                    ...nextValue
                }));
                focus.current = !focus.current;
            }
        }else{
            focus.current = !focus.current;
        }
    });

    return(
        <View style={styles.container}>
            <LikeTop
                selectedTitle={selectedBoard.title} 
                categoryValue={categoryValue}
                categoryTotal={categoryTotal}/>
            <ScrollView contentContainerStyle={styles.scrollAlign} showsVerticalScrollIndicator={false}>
                <View style={[styles.top, communityDetail.current.prev === "Board" ? styles.topBoard : styles.topNotice]}>
                    {communityDetail.current.prev === "Board" ?
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