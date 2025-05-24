//기타
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

//style
import styles from "@styles/common/useElement/titleTop.style";

//Context
import { useCommon } from "../../../context/commonContext";
import { useRecipe } from "../../../context/recipeContext";
import { useCommunity } from "../../../context/communityContext";
import { useMyPage } from "../../../context/myPageContext";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";
import { NavigateType } from "../../../types/navigateTypes";

//Redux
import { setCategoryValue } from "../../../redux/commonSlice";
import { useDispatch } from "react-redux";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    selectedTitle: string;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
}

function LikeTop(props: Props): React.JSX.Element{
    const {selectedTitle, categoryValue, categoryTotal} = props;
    const {mainPage, subPage} = useCommon();
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProps>();
    const detailPage = categoryValue.main === "Recipe" ?
                        useRecipe().recipeDetail : categoryValue.main === "Community" ?
                        useCommunity().communityDetail : useMyPage().myPageDetail;

    const pressBtn = (type: string) => {
        switch (type) {
            case "back":
                console.log(detailPage);
                const mainIndex = categoryTotal.findIndex(item => item.main === mainPage.current.now);
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === subPage.current.prev);
                const detailIndex = categoryTotal[mainIndex].detail[subIndex].findIndex(item => item === detailPage.current.prev);
                subPage.current = {
                    ...subPage.current,
                    now: mainPage.current.now === "MyPage" ? "WishList" : "List"}
                dispatch(setCategoryValue({
                    ...categoryValue,
                    sub: categoryTotal[mainIndex].sub[subIndex],
                    detail: categoryTotal[mainIndex].detail[subIndex][detailIndex],
                    detail_1: categoryTotal[mainIndex].detail_1[subIndex][detailIndex][0],
                }));
                navigation.goBack();
                break;
            case "like":
                console.log("좋아요");
                break;
            default:
                break;
        }
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={() => pressBtn("back")}>
                <Image style={styles.leftIcon} source={require("../../../assets/image/back.png")}/>
            </Pressable>
            <Text style={[styles.center, styles.title]}>{selectedTitle}</Text>
            <Pressable onPress={() => pressBtn("like")}>
                {categoryValue.main === "Community" ? 
                    <Image style={styles.rightIcon} source={require("../../../assets/image/thumb.png")}/>:
                    <Image style={styles.rightIcon} source={require("../../../assets/image/unlike.png")}/>}
            </Pressable>
        </View>
    )
}

export default LikeTop;