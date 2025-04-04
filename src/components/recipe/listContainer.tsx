//기타
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

//컴포넌트
import SwitchTop from "../common/body/switchTop";
import SelectSubCg from "../common/body/selectSubCg";

function ListContainer(): React.JSX.Element{
    const [mainCg, setMainCg] = useState("Korean");
    const elementsMain = ["Korean", "Japanese", "Chinese", "Western", "Other"];
    const elementsSubArr = [
        ["전체", "국, 찌개", "밥, 면", "반찬", "기타"], 
        ["전체", "국, 전골", "밥", "면", "기타"],
        ["전체", "튀김, 찜", "밥", "면", "기타"],
        ["전체", "스프, 스튜", "빵", "면", "기타"], []]
    const [elementsSub, setElementsSub] = useState(["전체", "국, 찌개", "밥, 면", "반찬", "기타"]);

    const exListElements = [
        {
            foodName: "성게미역국",
            foodImg: "../../assets/image/noImage.png",
            userId: "yoon",
            profileImg: "../../assets/image/profile.png",
            category: "국, 찌개",
            time: 30,
        },
        {
            foodName: "미역오이냉국",
            foodImg: "../../assets/image/noImage.png",
            userId: "hong",
            profileImg: "../../assets/image/profile.png",
            category: "국, 찌개",
            time: 10,
        },
        {
            foodName: "곤드레전",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            category: "기타",
            time: 20,
        },
        {
            foodName: "김치 비빔 국수수",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            category: "밥, 면",
            time: 20,
        },
        {
            foodName: "꼬막장",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            category: "반찬",
            time: 20,
        },
        {
            foodName: "파채불고기",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            category: "반찬",
            time: 20,
        },
        {
            foodName: "표고버섯 덮밥",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            category: "밥, 면",
            time: 20,
        }
    ]

    const subCheck = (value: string) => {
        const index = elementsMain.indexOf(value);
        setElementsSub(elementsSubArr[index]);
    }

    useEffect(() => {
        subCheck(mainCg);
    }, [mainCg]);

    return(
        <View style={styles.container}>
            <SwitchTop elements={elementsMain} setMainCg={setMainCg}/>
            {mainCg !== "Other" && <SelectSubCg elements={elementsSub}/>}
            <ScrollView style={styles.list} contentContainerStyle={styles.listAlign}>
                {exListElements.map((item, index) => (
                    <View key={index} style={styles.element}>
                        <Image style={styles.foodImg} source={require("../../assets/image/noImage.png")}/>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
    },
    list:{
        flex: 1,
        width: "93%"
    },
    listAlign:{
        flexWrap: "wrap",
        flexDirection: "row",
    },
    element:{
        width: "44%",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "3%",
        marginRight: "3%",
        borderRadius: 5,
        aspectRatio: 3 / 5.1,
        borderWidth: 1,
        borderColor: "rgba(99, 99, 99, 1)",
        flexDirection: "column",
        alignItems: "center",
    },
    foodImg: {
        height: "70%",
        marginTop: "5%",
        resizeMode: "contain",
        aspectRatio: 1 / 1,
    }
})

export default ListContainer;