//기타
import React from "react";
import { Pressable, Text, View } from "react-native";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setCategoryValue } from "../../../../redux/commonSlice";
import { RootState } from "../../../../redux/store";

//Context
import { useCommon } from "../../../../context/commonContext";
import ListBox from "../../../../components/recipe/list/listBox";
import { useMyPage } from "../../../../context/myPageContext";

//style
import styles from "@styles/myPage/body/myRecipe/myRecipe.style";

//Navigation
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Type
import { NavigateType } from "../../../../types/navigateTypes";

type NavigateProps = NativeStackNavigationProp<NavigateType>;

function MyRecipe(): React.JSX.Element{
    const {categoryTotal, subPage} = useCommon();
    const {focus} = useMyPage();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const navigation = useNavigation<NavigateProps>();
    const dispatch = useDispatch();

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "MyRecipe");

        const nextValue = {
            main: categoryTotal[mainIndex].main,
            sub: categoryTotal[mainIndex].sub[subIndex],
            detail: categoryTotal[mainIndex].detail[subIndex][0],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0],
        }

        subPage.current = {
            ...subPage.current,
            prev: "MyRecipe",
        }

        if(nextValue.main !== categoryValue.main || nextValue.sub !== categoryValue.sub){
            if(!focus.current){
                dispatch(setCategoryValue({
                    ...categoryValue,
                    ...nextValue
                }));
                focus.current = !focus.current;
            }
        }else{
            focus.current = !focus.current;
        }
    });

    const recipeWrite = () => {
        navigation.navigate("MyPage", {
            screen: "RecipeWrite"
        });
    }

    return(
        <View style={styles.container}>
            <View style={styles.writeBtnBox}>
                <Pressable onPress={recipeWrite}>
                    <Text style={styles.writeBtn}>레시피 작성</Text>
                </Pressable>
            </View>
            <ListBox/>
        </View>
    )
}

export default MyRecipe;