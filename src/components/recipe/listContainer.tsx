//기타
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

//컴포넌트
import SwitchTop from "../common/body/switchTop";
import SelectSubCg from "../common/body/selectSubCg";

function ListContainer(): React.JSX.Element{
    const [mainCg, setMainCg] = useState("Korean");
    const [subCg, setSubCg] = useState(0);
    const elementsMain = ["Korean", "Japanese", "Chinese", "Western", "Other"];
    const elementsSubArr = [
        ["전체", "국/찌개", "밥/면", "반찬", "기타"], 
        ["전체", "국/전골", "밥", "면", "기타"],
        ["전체", "튀김, 찜", "밥", "면", "기타"],
        ["전체", "스프/스튜", "빵", "면", "기타"], []]
    const [elementsSub, setElementsSub] = useState(elementsSubArr[0]);

    //임시 데이터
    const exListElements = [
        {
            foodName: "성게미역국",
            foodImg: "../../assets/image/noImage.png",
            userId: "yoon",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "국/찌개",
            time: 30,
        },
        {
            foodName: "미역오이냉국",
            foodImg: "../../assets/image/noImage.png",
            userId: "hong",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "국/찌개",
            time: 10,
        },
        {
            foodName: "곤드레전",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "기타",
            time: 20,
        },
        {
            foodName: "김치 비빔 국수",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "밥/면",
            time: 20,
        },
        {
            foodName: "꼬막장",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "반찬",
            time: 20,
        },
        {
            foodName: "파채불고기",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "반찬",
            time: 20,
        },
        {
            foodName: "표고버섯 덮밥",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "밥/면",
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
            <SwitchTop elements={elementsMain} setSelectCg={setMainCg}/>
            {mainCg !== "Other" && <SelectSubCg elements={elementsSub} subCg={subCg} setSubCg={setSubCg}/>}
            <ScrollView style={styles.list} contentContainerStyle={styles.listAlign}>
                {exListElements.filter((item) => {
                        const isMainCg = (item.mainCg === mainCg);
                        const isSubCg = (subCg === 0 || item.subCg === elementsSub[subCg]);
                        return isMainCg && isSubCg;
                    }).map((item, index) => (
                        <Pressable key={index} style={styles.element}>
                            <View style={styles.foodImgBox}>
                                {/* 코드 변경 필요 */}
                                <Image style={styles.foodImg} source={require("../../assets/image/참치김치찌개.jpg")}/>
                            </View>
                            <Text style={[styles.elementTxt, styles.foodName]}>{item.foodName}</Text>
                            <View style={styles.subInfo}>
                                <View style={styles.userTimeBox}>
                                    {/* 코드 변경 필요 */}
                                    <Image style={styles.subInfoImg} source={require("../../assets/image/profile.png")}/>
                                    <Text style={[styles.elementTxt, styles.subInfoTxt, styles.userTxt]}>{item.userId}</Text>
                                </View>
                                <View style={styles.userTimeBox}>
                                    <Image style={styles.subInfoImg} source={require("../../assets/image/time.png")}/>
                                    <Text style={[styles.elementTxt, styles.subInfoTxt, styles.timeTxt]}>{`${item.time}분`}</Text>
                                </View>
                            </View>
                        </Pressable>
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
        borderWidth: 1,
        borderColor: "rgb(71, 71, 71)",
        flexDirection: "column",
        alignItems: "center",
    },
    foodImgBox: {
        borderColor: "rgba(152, 152, 152, 0.5)",
        elevation: 4,
        borderWidth: 1,
        borderRadius: 3,
        marginTop: "7%",
        marginBottom: "3%",
        width: "86%",
        aspectRatio: 1 / 1
    },
    foodImg:{
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        aspectRatio: 1 / 1,
    },
    elementTxt:{
        fontFamily: "SourceSerif4-Bold",
    },
    foodName:{
        fontSize: 14,
        color: "rgb(90, 90, 90)"
    },
    subInfo:{
        width: "90%",
        height: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 7,
        marginBottom: 7,
    },
    subInfoImg:{
        width: 13,
        height: 13,
        resizeMode: "contain",
    },
    subInfoTxt:{
        height: 15,
        color: "rgba(160, 160, 160, 1)",
        fontSize: 12,
        lineHeight: 15,
    },
    userTxt:{
        marginLeft: 2
    },
    timeTxt:{
        marginLeft: 1
    },
    userTimeBox:{
        flexDirection: "row",
        alignItems: "flex-end",
    },
})

export default ListContainer;