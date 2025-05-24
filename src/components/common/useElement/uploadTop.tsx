//기타
import React from "react";
import { Image, Pressable, TextInput, View } from "react-native";

//Style
import styles from "@styles/common/useElement/titleTop.style";

//Redux
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";
import { NavigateType } from "../../../types/navigateTypes";

//Navigation
import { useNavigation } from "@react-navigation/native";

//Context
import { useCommunity } from "../../../context/communityContext";
import { useMyPage } from "../../../context/myPageContext";
import { useCommon } from "../../../context/commonContext";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    selectedTitle: string;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
}

function UploadTop(props: Props): React.JSX.Element{
    const {selectedTitle, categoryValue, categoryTotal} = props;
    const {mainPage, subPage} = useCommon();
    const navigation = useNavigation<NavigationProps>();
    const detailPage = categoryValue.main === "Community" ? useCommunity().communityDetail : useMyPage().myPageDetail;
    const dispatch = useDispatch();

    const pressBtn = (type: string) => {
        switch (type) {
            case "back":
                const mainIndex = categoryTotal.findIndex(item => item.main === mainPage.current.now);
                const subIndex = categoryTotal[mainIndex].sub
                        .findIndex(item => item === (mainPage.current.now === "Community" ?
                                                    subPage.current.prev : "RecipeInfo"));
                const detailIndex = mainPage.current.now === "Community" ?
                            categoryTotal[mainIndex].detail[subIndex].findIndex(item => item === detailPage.current.prev) : 0;
                subPage.current = {
                    ...subPage.current,
                    now: mainPage.current.now === "Community" ? "List" : "RecipeInfo"
                }
                dispatch(setCategoryValue({
                    ...categoryValue,
                    sub: categoryTotal[mainIndex].sub[subIndex],
                    detail: categoryTotal[mainIndex].detail[subIndex][detailIndex],
                    detail_1: categoryTotal[mainIndex].detail_1[subIndex][detailIndex][0],
                }));
                navigation.goBack();
                break;
            case "upload":
                console.log("업로드");
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
            <TextInput style={[styles.center, styles.inputTitle]} placeholder="- title -"/>
            <Pressable onPress={() => pressBtn("upload")}>
                <Image style={styles.rightIcon} source={require("../../../assets/image/upload.png")}/>
            </Pressable>
        </View>
    )
}

export default UploadTop;