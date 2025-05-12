//기타
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SelectedRecipeType } from "../../../types/recipeTypes";
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";

//컴포넌트
import TitleTop from "../../common/body/titleTop";
import IngreBox from "./ingreBox";
import StepBox from "./stepBox";
import CommentBox from "../../common/body/commentBox";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { setCategoryValue } from "../../../redux/commonSlice";

type Props = {
    listType: React.RefObject<string>;
    selectedRecipe: SelectedRecipeType;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
}

function InfoContainer(props: Props): React.JSX.Element{
    const {listType, selectedRecipe, categoryTotal, categoryValue} = props;
    const dispatch = useDispatch();

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
                listType={listType}
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