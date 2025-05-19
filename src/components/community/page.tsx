//기타
import React from "react";
import { View } from "react-native";

//Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Component
import ListBody from "./list/listBody";
import InfoBody from "./info/infoBody";
import WriteBody from "./write/writeBody";

//style
import styles from "@styles/community/page.style";

const CommunityStack = createNativeStackNavigator();

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

function PageCommunity(): React.JSX.Element{

    return(
        <View style={styles.container}>
            <CommunityStack.Navigator screenOptions={{headerShown: false}}>
                <CommunityStack.Screen name="List" component={ListBody}/>
                <CommunityStack.Screen name="Info" component={InfoBody}/>
                <CommunityStack.Screen name="Write" component={WriteBody}/>
            </CommunityStack.Navigator>
        </View>
    )
}

export default PageCommunity;