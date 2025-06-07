//기타
import React, { useCallback } from "react";
import { Pressable, Text, View } from "react-native";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

//Context
import { useCommon } from "../../../../context/commonContext";
import ListBox from "../../../../components/recipe/list/listBox";

//style
import styles from "@styles/myPage/body/myRecipe/myRecipe.style";

//Navigation
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Type
import { NavigateType } from "../../../../types/navigateTypes";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

type NavigateProps = NativeStackNavigationProp<NavigateType>;

function MyRecipe(): React.JSX.Element{
    const {categoryTotal, success, prev} = useCommon();
    const {categoryChange} = useCategory();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const navigation = useNavigation<NavigateProps>();

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => 
                    item === prev.current[0].sub);
                const detailIndex = categoryTotal[mainIndex].detail[subIndex].findIndex(item => 
                    item === prev.current[0].detail)
                categoryChange(mainIndex, subIndex, detailIndex, 0);
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    );

    const recipeWrite = () => {
        prev.current = [categoryValue]
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