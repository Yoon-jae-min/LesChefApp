//기타
import React, { useCallback } from "react";
import { FlatList, Image, Pressable, View } from "react-native";

//style
import styles from "@styles/myPage/body/recipeWrite/recipeWrite.style";

//Component
import UploadTop from "../../../common/useElement/top/uploadTop";
import IngredientInput from "./ingredient/ingredientInput";
import StepInput from "./step/stepInput";
import InfoInput from "./info/infoInput";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

//Context
import { useCommon } from "../../../../context/commonContext";
import { useFocusEffect } from "@react-navigation/native";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

function RecipeWrite(): React.JSX.Element{
    const {categoryTotal, success} = useCommon();
    const {categoryChange} = useCategory();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard);

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "RecipeWrite");
                categoryChange(mainIndex, subIndex, 0 , 0);
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    );

    return(
        <View style={styles.container}>
            <UploadTop
                selectedTitle={selectedBoard.title}
                categoryValue={categoryValue}
                categoryTotal={categoryTotal}/>
            <FlatList
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                data={[]}
                renderItem={() => null}
                ListHeaderComponent={
                    <React.Fragment>
                        <InfoInput/>
                        <View style={styles.imgInputBox}>
                            <Pressable>
                                <Image/>
                            </Pressable>
                        </View>
                        <IngredientInput/>
                        <StepInput/>
                    </React.Fragment>
                }/>
        </View>
    )
}

export default RecipeWrite;