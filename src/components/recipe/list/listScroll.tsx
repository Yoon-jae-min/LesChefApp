//기타
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

//Navigation
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRecipe } from "../../../redux/recipeSlice";
import { RootState } from "../../../redux/store";

//Context
import { useCommon } from "../../../context/commonContext";
import { useDummy } from "../../../context/dummyContext";

//Type
import { NavigateType } from "../../../types/navigateTypes";

//Style
import styles from "@styles/recipe/list/listScroll.style";

type NavigateProps = NativeStackNavigationProp<NavigateType>;

function ListScroll(): React.JSX.Element{
    const exListElements = useDummy().recipeListData;
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedRecipe = useSelector((state: RootState) => state.recipe.selectedRecipe);
    const {prev} = useCommon();
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigateProps>();

    const touchRecipe = (recipeId: string, foodName: string) => {
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
        prev.current = [categoryValue]
        if(categoryValue.main === "Recipe"){
            navigation.navigate("Recipe",{
                screen: "Info",
            });
        }else if(categoryValue.main === "MyPage"){
            navigation.navigate("MyPage",{
                screen: "RecipeInfo",
            });
        }
    }

    return(
        <ScrollView style={styles.list} contentContainerStyle={styles.listAlign}>
            {exListElements.filter((item) => {
                    const isMainCg = (item.mainCg === categoryValue.detail);
                    const isSubCg = categoryValue.detail === "Other" ? true :
                            ((categoryValue.detail_1 === "전체") || (item.subCg === categoryValue.detail_1));
                    
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
    )
}

export default ListScroll;