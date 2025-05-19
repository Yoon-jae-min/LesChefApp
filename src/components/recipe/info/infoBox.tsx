//기타
import React from "react";
import { Image, View } from "react-native";

//Component
import TitleTop from "../../common/useElement/titleTop";
import IngreBox from "./ingreBox";
import StepBox from "./stepBox";
import CommentBox from "../../common/useElement/cmtBox";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

//Context
import { useCommon } from "../../../context/commonContext";

//style
import styles from "@styles/recipe/info/infoBox.style";
import { ScrollView, Text } from "react-native-gesture-handler";

function InfoBox(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedRecipe = useSelector((state: RootState) => state.recipe.selectedRecipe);

    // useFocusEffect(() => {
    //     if(categoryValue.main === "Recipe"){
    //         const mainIndex = categoryTotal.findIndex(item => item.main === categoryValue.main);
    //         const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Info");

    //         const nextValue = {
    //             main: categoryTotal[mainIndex].main,
    //             sub: categoryTotal[mainIndex].sub[subIndex],
    //             detail: categoryTotal[mainIndex].detail[subIndex][0],
    //             detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0]
    //         };

    //         if((nextValue.main !== categoryValue.main) || (nextValue.sub !== categoryValue.sub)){
    //             dispatch(setCategoryValue({
    //                 ...categoryValue,
    //                 ...nextValue
    //             }));
    //         }
    //     }
    // });

    return(
        <View style={styles.container}>
            <TitleTop
                selectedTitle={selectedRecipe.title}
                categoryTotal={categoryTotal}
                categoryValue={categoryValue}/>
            <ScrollView contentContainerStyle={styles.scrollAlign}>
                <View style={styles.topInfoBox}>
                    <View style={styles.leftInfo}>
                        <Text style={styles.category}>
                            {selectedRecipe.mainSolt === "기타" ? selectedRecipe.mainSolt :
                                `${selectedRecipe.mainSolt} > ${selectedRecipe.subSolt}`}
                        </Text>
                    </View>
                    <View style={styles.rightInfo}>
                        <Text style={styles.portion}>{`${selectedRecipe.portion}인분`}</Text>
                        <View style={styles.line}></View>
                        <View style={styles.timeBox}>
                            <Image source={require("../../../assets/image/time.png")} style={styles.timeImg}/>
                            <Text style={styles.timeText}>{`${selectedRecipe.time}분`}</Text>
                        </View>
                    </View>
                </View>
                <Image style={styles.mainImg} source={require("../../../assets/image/noImage.png")}/>
                <IngreBox
                    ingres={selectedRecipe.ingres}/>
                <StepBox
                    steps={selectedRecipe.steps}/>
                <CommentBox
                    comments={selectedRecipe.comments}/>
            </ScrollView>
        </View>
    )
}

export default InfoBox;