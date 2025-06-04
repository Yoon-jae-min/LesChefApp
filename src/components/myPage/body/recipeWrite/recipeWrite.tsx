//기타
import React from "react";
import { FlatList, Image, Pressable, View } from "react-native";

//style
import styles from "@styles/myPage/body/recipeWrite/recipeWrite.style";

//Component
import UploadTop from "../../../common/useElement/uploadTop";
import IngredientInput from "./ingredient/ingredientInput";
import StepInput from "./step/stepInput";
import InfoInput from "./info/infoInput";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

//Context
import { useCommon } from "../../../../context/commonContext";

function RecipeWrite(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard);

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