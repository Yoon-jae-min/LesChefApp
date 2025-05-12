//기타
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";
import { SelectedBoardType } from "../../../types/boardTypes";
import { NavigateType } from "../../../types/navigateTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";

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

type NavigationProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    listType: React.RefObject<string>;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
    setSelectedBoard: React.Dispatch<React.SetStateAction<SelectedBoardType>>;
}

function ListScroll(props: Props): React.JSX.Element{
    const {listType, categoryValue, categoryTotal, setSelectedBoard} = props;
    const [listValue, setListValue] = useState(exList[0]);
    const dispatch = useDispatch();

    const navigation = useNavigation<NavigationProps>();

    useEffect(() => {
        if(categoryValue.sub === "List"){
            setListValue(categoryValue.detail === "Notice" ? exList[0] : exList[1]);
        }
    }, [categoryValue.detail]);

    const pressBoard = (boardId: string, title: string, userId: string) => {
        listType.current = categoryValue.detail;

        dispatch(setCategoryValue({
            ...categoryValue,
            sub: categoryTotal[3].sub[1],
            detail: categoryTotal[3].detail[1][0],
            detail_1: categoryTotal[3].detail_1[1][0][0]
        }))
        setSelectedBoard((prev) => ({
            ...prev,
            boardId: boardId,
            title: title,
            content: "하이요!!",
            userId: userId,
            profileImg: "",
            time: "2025.04.22 00:54:32",
            viewCount: 0,
        }));

        navigation.navigate("Board", {
            screen: "Info",
        })
    }

    return(
        <View style={styles.container}>
            {listValue.map((item, index) => (
                <Pressable key={index} style={styles.element} onPress={() => pressBoard(item.boardId, item.title, item.userId)}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.bottomBox}>
                        {categoryValue.detail === "Notice" ? 
                            <View style={styles.noticeTime}></View> :
                            <React.Fragment>
                                <View style={styles.leftInfo}>
                                    <Image style={styles.bottomImg} source={require("../../../assets/image/profile.png")}/>
                                    <Text style={styles.bottomTxt}>{item.userId}</Text>
                                </View>
                                <View style={styles.rightInfo}></View>
                            </React.Fragment>}
                    </View>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    element:{
        width: "100%",
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 3,
        marginBottom: 3,
        justifyContent: "space-between"
    },
    title:{
        width: "80%",
        marginLeft: 10,
        marginTop: 5,
    },
    bottomBox:{
        marginBottom: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftInfo:{
        height: 15,
        flexDirection: "row",
        marginLeft: 7
    },
    rightInfo:{
        height: 15,
        marginRight: 7,
        flexDirection: "row",
        borderWidth: 1
    },
    bottomImg:{
        width: 13,
        height: 13,
        marginRight: 5,
    },
    bottomTxt:{
        height: 13,
        fontSize: 10,
        color: "rgba(67, 67, 67, 1)"
    },
    noticeTime:{
        borderWidth: 1,
        height: 15,
        width: "100%"
    }
});

export default ListScroll;