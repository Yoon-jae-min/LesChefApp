//기타
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Component
import CommentBox from "../../common/body/commentBox";
import TitleTop from "../../common/body/titleTop";

//Context
import { useCommon } from "../../../context/commonContext";
import { useCommunity } from "../../../context/communityContext";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCategoryValue } from "../../../redux/commonSlice";


function InfoBody(): React.JSX.Element{
    const {categoryTotal} = useCommon();
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
            dispatch(setCategoryValue({
                ...categoryValue,
                ...nextValue
            }));
        }
    });

    return(
        <View style={styles.container}>
            <TitleTop
                selectedTitle={selectedBoard.title} 
                categoryValue={categoryValue}
                categoryTotal={categoryTotal}/>
            <View style={categoryValue.detail === "Board" ? styles.top : styles.topNotice}>
                {categoryValue.detail === "Board" && 
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