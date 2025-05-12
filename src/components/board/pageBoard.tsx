//기타
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CategoryTotalType, CategoryValueType } from "../../types/commonTypes";

//컴포넌트
import ListBody from "./list/listBody";
import InfoBody from "./info/infoBody";
import WriteBody from "./write/writeBody";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCommon } from "../../context/commonContext";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Stack = createNativeStackNavigator();

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

// type Props = {
//     categoryValue: React.RefObject<CategoryValueType>;
//     categoryTotal: CategoryTotalType[];
//     // setCategoryValue: React.Dispatch<React.SetStateAction<CategoryValueType>>;
// }

function PageBoard(): React.JSX.Element{
    // const {categoryValue, categoryTotal} = props;
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const [boardCg, setBoardCg] = useState("Notice");
    const listType = useRef(categoryValue.detail);
    const [selectedBoard, setSelectedBoard] = useState({
        boardId: "",
        title: "",
        content: "",
        userId: "",
        profileImg: "",
        time: "",
        viewCount: 0,
        comments:[{
            profileImg: "",
            userId: "",
            time: "",
            content: "",
        }]
    })

    return(
        <View style={styles.container}>
            <Stack.Navigator screenOptions={{headerShown: true}}>
                <Stack.Screen name="List">
                    {() => 
                        <ListBody 
                            listType={listType}
                            categoryValue={categoryValue}
                            categoryTotal={categoryTotal}
                            setSelectedBoard={setSelectedBoard}/>}
                </Stack.Screen>
                <Stack.Screen name="Info">
                    {() => 
                        <InfoBody
                            listType={listType}
                            selectedBoard={selectedBoard} 
                            categoryValue={categoryValue}
                            categoryTotal={categoryTotal}
                            boardType={boardCg}/>}
                </Stack.Screen>
                <Stack.Screen name="Write">
                    {() => 
                        <WriteBody
                            listType={listType}
                            selectedBoard={selectedBoard} 
                            categoryValue={categoryValue}
                            categoryTotal={categoryTotal}/>}
                </Stack.Screen>
            </Stack.Navigator>
            {/* {categoryValue.sub === "List" && 
                <ListBody 
                    listType={listType}
                    categoryValue={categoryValue}
                    categoryTotal={categoryTotal}
                    setCategoryValue={setCategoryValue}
                    setSelectedBoard={setSelectedBoard}/>} */}
            {/* {categoryValue.sub === "Info" && 
                <InfoBody
                    listType={listType}
                    selectedBoard={selectedBoard} 
                    categoryValue={categoryValue}
                    categoryTotal={categoryTotal}
                    setCategoryValue={setCategoryValue}
                    boardType={boardCg}/>} */}
            {/* {categoryValue.sub === "Write" && 
                <WriteBody
                    listType={listType}
                    selectedBoard={selectedBoard} 
                    categoryValue={categoryValue}
                    categoryTotal={categoryTotal}
                    setCategoryValue={setCategoryValue}/>} */}
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

