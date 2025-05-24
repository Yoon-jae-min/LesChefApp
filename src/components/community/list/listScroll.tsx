//기타
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

//Type
import { NavigateType } from "../../../types/navigateTypes";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setSelectedBoard } from "../../../redux/communitySlice";

//style
import styles from "@styles/community/list/listScroll.style";

//Context
import { useCommon } from "../../../context/commonContext";
import { useDummy } from "../../../context/dummyContext";
import { useCommunity } from "../../../context/communityContext";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

function ListScroll(): React.JSX.Element{
    const exList = useDummy().boardListData;
    const [listValue, setListValue] = useState(exList[0]);
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard);
    const {subPage} = useCommon();
    const {communityDetail} = useCommunity();
    const dispatch = useDispatch();

    const navigation = useNavigation<NavigationProps>();

    useEffect(() => {
        if(categoryValue.sub === "List"){
            setListValue(categoryValue.detail === "Notice" ? exList[0] : exList[1]);
        }
    }, [categoryValue.detail]);

    const pressBoard = (boardId: string, title: string, userId: string) => {
        subPage.current = {
            ...subPage.current,
            prev: "List",
            now: "Info"
        }
        communityDetail.current = {
            ...communityDetail.current,
            prev: categoryValue.detail
        }
        dispatch(setSelectedBoard({
            ...selectedBoard,
            boardId: boardId,
            title: title,
            content: "하이요!!",
            userId: userId,
            profileImg: "",
            time: "2025.04.22 00:54:32",
            viewCount: 0,
            comments:[
                {
                    profileImg: "",
                    userId: "kim",
                    time: "2025.05.12 12:52:22",
                    content: "반가워요!!!!",
                },
                {
                    profileImg: "",
                    userId: "hong",
                    time: "2025.05.10 18:25:49",
                    content: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
                },
                {
                    profileImg: "",
                    userId: "yoon",
                    time: "2025.04.27 03:12:10",
                    content: "굿굿굿",
                },
            ]
        }));
        navigation.navigate("Community", {
            screen: "Info",
        });
    }

    return(
        <View style={styles.container}>
            {listValue.map((item, index) => (
                <Pressable key={index} style={styles.element} onPress={() => pressBoard(item.boardId, item.title, item.userId)}>
                    <View style={styles.topBox}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.viewCount}>
                            <Image source={require("../../../assets/image/viewCount.png")} style={styles.vcImg}/>
                            <Text style={styles.vcText}>{item.viewCount}</Text>
                        </View>
                    </View>
                    
                    <View style={[styles.bottomBox, categoryValue.detail === "Notice" ? styles.noticeBtm : styles.boardBtm]}>
                        {categoryValue.detail === "Board" && 
                            <View style={styles.leftInfo}>
                                <Image style={styles.profileImg} source={require("../../../assets/image/profile.png")}/>
                                <Text style={styles.userId}>{item.userId}</Text>
                            </View>}
                        <View style={styles.rightInfo}>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                    </View>
                </Pressable>
            ))}
        </View>
    )
}

export default ListScroll;