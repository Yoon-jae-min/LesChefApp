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
import { useCommunity } from "../../../context/communityContext";

//style
import styles from "@styles/community/list/listScroll.style";

//임시 데이터
const exList = [
    [
        {
            boardId: "11111",
            title: "공지1",
            userId: "admin2",
            profileImg: "",
            time: "2025.03.01 19:19:19",
            viewCount: 0,
        },
        {
            boardId: "22222",
            title: "반갑습니다",
            userId: "admin2",
            profileImg: "",
            time: "2025.01.22 05:30:12",
            viewCount: 0,
        },
        {
            boardId: "33333",
            title: "이벤트1",
            userId: "admin1",
            profileImg: "",
            time: "2024.12.12 00:11:22",
            viewCount: 0,
        }
    ],
    [
        {
            boardId: "!11111",
            title: "테스트--------",
            userId: "woasl",
            profileImg: "",
            time: "2025.05.01 20:30:48",
            viewCount: 4,
        },
        {
            boardId: "!22222",
            title: "자유 게시판",
            userId: "free",
            profileImg: "",
            time: "2025.01.15 10:23:45",
            viewCount: 1002,
        },
        {
            boardId: "!33333",
            title: "안녕하세요!!!!!!",
            userId: "hello123",
            profileImg: "",
            time: "2024.12.22 09:11:22",
            viewCount: 123,
        },
        {
            boardId: "!44444",
            title: "좋은하루입니다",
            userId: "tleod1818",
            profileImg: "",
            time: "2024.12.12 00:11:22",
            viewCount: 1526,
        },
    ]
];

type NavigationProps = NativeStackNavigationProp<NavigateType>;

function ListScroll(): React.JSX.Element{
    const [listValue, setListValue] = useState(exList[0]);
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard);
    const listType = useCommunity().communityLT;
    const dispatch = useDispatch();

    const navigation = useNavigation<NavigationProps>();

    useEffect(() => {
        if(categoryValue.sub === "List"){
            setListValue(categoryValue.detail === "Notice" ? exList[0] : exList[1]);
        }
    }, [categoryValue.detail]);

    const pressBoard = (boardId: string, title: string, userId: string) => {
        listType.current = categoryValue.detail;

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