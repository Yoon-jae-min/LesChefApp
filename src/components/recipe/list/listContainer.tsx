//기타
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";
import { SelectedRecipeType } from "../../../types/recipeTypes";
import { NavigateType } from "../../../types/navigateTypes";

//컴포넌트
import ListSwitch from "../../common/body/listSwitch";
import SelectSubCg from "../../common/body/selectSubCg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";

//임시 데이터
const exListElements = [
    {
        recipeId: "1",
        foodName: "성게미역국",
        foodImg: "../../assets/image/noImage.png",
        userId: "yoon",
        profileImg: "../../assets/image/profile.png",
        mainCg: "Korean",
        subCg: "국/찌개",
        time: 30,
    },
    {
        recipeId: "2",
        foodName: "미역오이냉국",
        foodImg: "../../assets/image/noImage.png",
        userId: "hong",
        profileImg: "../../assets/image/profile.png",
        mainCg: "Korean",
        subCg: "국/찌개",
        time: 10,
    },
    {
        recipeId: "3",
        foodName: "곤드레전",
        foodImg: "../../assets/image/noImage.png",
        userId: "kim",
        profileImg: "../../assets/image/profile.png",
        mainCg: "Korean",
        subCg: "기타",
        time: 20,
    },
    {
        recipeId: "4",
        foodName: "김치 비빔 국수",
        foodImg: "../../assets/image/noImage.png",
        userId: "kim",
        profileImg: "../../assets/image/profile.png",
        mainCg: "Korean",
        subCg: "밥/면",
        time: 20,
    },
    {
        recipeId: "5",
        foodName: "꼬막장",
        foodImg: "../../assets/image/noImage.png",
        userId: "kim",
        profileImg: "../../assets/image/profile.png",
        mainCg: "Korean",
        subCg: "반찬",
        time: 20,
    },
    {
        recipeId: "6",
        foodName: "파채불고기",
        foodImg: "../../assets/image/noImage.png",
        userId: "kim",
        profileImg: "../../assets/image/profile.png",
        mainCg: "Korean",
        subCg: "반찬",
        time: 20,
    },
    {
        recipeId: "7",
        foodName: "표고버섯 덮밥",
        foodImg: "../../assets/image/noImage.png",
        userId: "kim",
        profileImg: "../../assets/image/profile.png",
        mainCg: "Korean",
        subCg: "밥/면",
        time: 20,
    }
]

type NavigateProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    listType: React.RefObject<string>;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
    setSelectedRecipe: React.Dispatch<React.SetStateAction<SelectedRecipeType>>;
    // setCategoryValue: React.Dispatch<React.SetStateAction<CategoryValueType>>;
}

function ListContainer(props: Props): React.JSX.Element{
    const {listType, categoryValue, categoryTotal, setSelectedRecipe} = props;
    const dispatch = useDispatch();
    // const detailIndex = categoryTotal[1].detail[0].findIndex((item) => item === categoryValue.current.detail);
    // const detailIndex_1 =  categoryTotal[1].detail_1[0][detailIndex].findIndex((item) => item === categoryValue.current.detail_1);
    const [listState, setListState] = useState(false);

    const navigation = useNavigation<NavigateProps>();

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Recipe");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "List");
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

    const touchRecipe = (recipeId: string, foodName: string) => {
        const mainIndex = categoryTotal.findIndex((item) => item.main === categoryValue.main);
        const subIndex = categoryTotal[mainIndex].sub.findIndex((item) => item === "Info");

        listType.current = categoryValue.detail;

        dispatch(setCategoryValue({
            ...categoryValue,
            sub: categoryTotal[mainIndex].sub[subIndex],
            detail: categoryTotal[mainIndex].detail[subIndex][0],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0]
        }));

        setSelectedRecipe({
            title: foodName,
            mainSolt: "",
            subSolt: "",
            portion: 0,
            time: 0,
            imgUrl: "",
            ingres: [{
                sortName: "",
                units:[{
                    name: "",
                    amount: 0,
                    unit: "",
                }]
            }],
            steps: [{
                stepNum: 0,
                imgUrl: "",
                content: "",
            }],
            comments: [{
                profileImg: "",
                userId: "",
                time: "",
                content: "",
            }]
        });

        navigation.navigate("Recipe",{
            screen: "Info",
        })
    }

    return(
        <View style={styles.container}>
            <TextInput style={styles.searchBox} placeholder="입력하세요..."/>
            {categoryValue.main === "Recipe" && <ListSwitch listType={listType} categoryValue={categoryValue} categoryTotal={categoryTotal} setListState={setListState}/>}
            {(categoryValue.detail !== "Other") && 
                    <SelectSubCg 
                        categoryTotal={categoryTotal} 
                        categoryValue={categoryValue}
                        setListState={setListState}/>}
            <ScrollView style={styles.list} contentContainerStyle={styles.listAlign}>
                {exListElements.filter((item) => {
                        const isMainCg = (item.mainCg === categoryValue.detail);
                        const isSubCg = ((categoryValue.detail_1 === "전체") || 
                                            (item.subCg === categoryValue.detail_1));
                        return isMainCg && isSubCg;
                    }).map((item, index) => (
                        <Pressable key={index} style={styles.element} onPress={() => touchRecipe(item.recipeId, item.foodName)}>
                            <View style={styles.foodImgBox}>
                                {/* 코드 변경 필요 */}
                                <Image style={styles.foodImg} source={require("../../../assets/image/참치김치찌개.jpg")}/>
                            </View>
                            <Text style={[styles.elementTxt, styles.foodName]}>{item.foodName}</Text>
                            <View style={styles.subInfo}>
                                <View style={styles.userTimeBox}>
                                    {/* 코드 변경 필요 */}
                                    <Image style={styles.subInfoImg} source={require("../../../assets/image/profile.png")}/>
                                    <Text style={[styles.elementTxt, styles.subInfoTxt, styles.userTxt]}>{item.userId}</Text>
                                </View>
                                <View style={styles.userTimeBox}>
                                    <Image style={styles.subInfoImg} source={require("../../../assets/image/time.png")}/>
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
        backgroundColor: "white"
    },
    searchBox:{
        width: "90%",
        height: 44,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: 5,
        marginBottom: 10,
        textAlign: "center",
        borderColor: "rgba(81, 81, 81, 1)",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        color: "rgba(160, 160, 160, 1)"
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