//기타
import React from "react";
import { Image, StyleSheet, View } from "react-native";

//Component
import TitleTop from "../../common/body/titleTop";
import IngreBox from "./ingreBox";
import StepBox from "./stepBox";
import CommentBox from "../../common/body/commentBox";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCategoryValue } from "../../../redux/commonSlice";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Context
import { useCommon } from "../../../context/commonContext";
import { useRecipe } from "../../../context/recipeContext";

function InfoContainer(): React.JSX.Element{
    const dispatch = useDispatch();
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedRecipe = useSelector((state: RootState) => state.recipe.selectedRecipe);

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Recipe");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Info");

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

    return(
        <View style={styles.container}>
            <TitleTop
                selectedTitle={selectedRecipe.title}
                categoryTotal={categoryTotal}
                categoryValue={categoryValue}/>
            <View style={styles.topInfoBox}>
                <View style={styles.leftInfo}></View>
                <View style={styles.rightInfo}></View>
            </View>
            <Image style={styles.mainImg} source={require("../../../assets/image/noImage.png")}/>
            <IngreBox
                ingres={selectedRecipe.ingres}/>
            <StepBox
                steps={selectedRecipe.steps}/>
            <CommentBox
                comments={selectedRecipe.comments}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    },
    topInfoBox:{

    },
    leftInfo:{

    },
    rightInfo:{

    },
    mainImg:{

    }
});

export default InfoContainer;