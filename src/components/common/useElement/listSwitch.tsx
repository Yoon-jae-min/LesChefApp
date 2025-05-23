//기타
import React from "react";
import { Image, Pressable, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";

//Redux
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";

//style
import {styles, pickerStyles} from "@styles/common/useElement/listSwitch.style";

//Context
import { useRecipe } from "../../../context/recipeContext";
import { useCommunity } from "../../../context/communityContext";
import { useMyPage } from "../../../context/myPageContext";

type Props = {
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
    setListState: React.Dispatch<React.SetStateAction<boolean>>;
}

function ListSwitch(props: Props): React.JSX.Element{
    const { categoryValue, categoryTotal, setListState} = props;
    const detailPage = categoryValue.main === "Recipe" ? 
                        useRecipe().recipeDetail : categoryValue.main === "Community" ?
                        useCommunity().communityDetail : useMyPage().myPageDetail;
    const mainIndex = categoryTotal.findIndex(item => item.main === categoryValue.main);
    const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === categoryValue.sub);
    const elements = categoryTotal[mainIndex].detail[subIndex];
    const dispatch = useDispatch();

    const indexCount = (value: string) => {
        return elements?.findIndex((item) => item === value);
    }

    const switchMenu = (arrow: string, value: string) => {
        let indexSave = indexCount(value);
        if(arrow === "left"){
            if(indexSave === 0) {
                indexSave = elements.length - 1;
            }else{
                indexSave -= 1;
            }
        }else if(arrow === "right"){
            if(indexSave === elements.length - 1){
                indexSave = 0;
            }else{
                indexSave += 1;
            }
        }
        const detailIndex = categoryTotal[mainIndex].detail[subIndex].findIndex(item => item === elements[indexSave]);
        detailPage.current = {
            ...detailPage.current,
            now: elements[indexSave]
        }
        dispatch(setCategoryValue({
            ...categoryValue,
            detail: elements[indexSave],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][detailIndex][0]
        }))
        setListState((prev) => (!prev));
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={() => switchMenu("left", categoryValue.detail)}>
                <Image style={styles.arrow} source={require("../../../assets/image/leftArrow.png")}/>
            </Pressable>
            <RNPickerSelect
                style={pickerStyles}
                value={categoryValue.detail}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                items={categoryTotal[mainIndex].detail[subIndex].map((item) => ({label: item, value: item})) ?? []}
                onValueChange={(value) => switchMenu("center", value)}/>
            <Pressable onPress={() => switchMenu("right", categoryValue.detail)}>
                <Image style={styles.arrow} source={require("../../../assets/image/rightArrow.png")}/>
            </Pressable>
        </View>
    )
}

export default ListSwitch;