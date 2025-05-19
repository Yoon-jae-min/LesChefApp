//기타
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

//Type
import { NavigateType } from "../../../types/navigateTypes";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

//Component
import ListSwitch from "../../common/useElement/listSwitch";
import SelectSubCg from "../../common/useElement/selectSubCg";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";
import { setSelectedRecipe } from "../../../redux/recipeSlice";
import { RootState } from "../../../redux/store";

//Context
import { useCommon } from "../../../context/commonContext";

//style
import styles from "@styles/recipe/list/listBox.style";


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

function ListBox(): React.JSX.Element{
    const [listState, setListState] = useState(false);
    const dispatch = useDispatch();
    const {categoryTotal, mySubValue} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedRecipe = useSelector((state: RootState) => state.recipe.selectedRecipe);

    const navigation = useNavigation<NavigateProps>();

    useFocusEffect(() => {
        if(categoryValue.main === "Recipe"){
            const mainIndex = categoryTotal.findIndex(item => item.main === categoryValue.main);
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
        }
    });

    const touchRecipe = (recipeId: string, foodName: string) => {
        const mainIndex = categoryTotal.findIndex(item => item.main === categoryValue.main);
        const subIndex = categoryTotal[mainIndex].sub.
                            findIndex(item => categoryValue.main === "Recipe" ? item === "Info" : item === "RecipeInfo");

        dispatch(setSelectedRecipe({
            ...selectedRecipe,
            recipeId: recipeId,
            title: foodName,
            mainSolt: "한식",
            subSolt: "국/찌개",
            portion: 2,
            time: 30,
            imgUrl: "",
            ingres: [{
                sortName: "기본 재료",
                units:[
                    {
                        name: "양파",
                        amount: 1,
                        unit: "망",
                    },
                    {
                        name: "계란",
                        amount: 2,
                        unit: "개",
                    }
                ]
            }],
            steps: [{
                stepNum: 1,
                imgUrl: "",
                content: "양파 썰기",
            }],
            comments: [{
                profileImg: "",
                userId: "yoon",
                time: "2025.02.11 03:44:52",
                content: "와아아아아ㅏㅏㅏㅏ!!!!",
            }]
        }));

        // switch(categoryValue.main){
        //     case "Recipe":
        //         navigation.navigate("Recipe",{
        //             screen: "Info",
        //         });
        //         break;
        //     case "MyPage":
        //         const mainIndex = categoryTotal.findIndex(item => item.main === categoryValue.main);
        //         const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "RecipeInfo");

        //         dispatch(setCategoryValue({
        //             ...categoryValue,
        //             sub: categoryTotal[mainIndex].sub[subIndex],
        //             detail: categoryTotal[mainIndex].detail[subIndex][0],
        //             detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0]
        //         }));
        // }

        if(categoryValue.main === "MyPage"){
            mySubValue.current === categoryValue.sub;
        }

        dispatch(setCategoryValue({
            ...categoryValue,
            sub: categoryTotal[mainIndex].sub[subIndex],
            detail: categoryTotal[mainIndex].detail[subIndex][0],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0]
        }));

        if(categoryValue.main === "Recipe"){
            navigation.navigate("Recipe",{
                screen: "Info",
            });
        }
    }

    return(
        <View style={styles.container}>
            {categoryValue.main === "Recipe" && <TextInput style={styles.searchBox} placeholder="입력하세요..."/>}
            <ListSwitch categoryValue={categoryValue} categoryTotal={categoryTotal} setListState={setListState}/>
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

export default ListBox;