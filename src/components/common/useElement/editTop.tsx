//기타
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";
import { NavigateType } from "../../../types/navigateTypes";

//style
import styles from "@styles/common/useElement/titleTop.style";

//Context
import { useCommon } from "../../../context/commonContext";
import { useMyPage } from "../../../context/myPageContext";

//Redux
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";

//Navigation
import { useNavigation } from "@react-navigation/native";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    selectedTitle: string;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
}

function EditTop(props: Props): React.JSX.Element{
    const {selectedTitle, categoryValue, categoryTotal} = props;
    const {mainPage, subPage} = useCommon();
    const {myPageDetail} = useMyPage();
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProps>();

    const pressBtn = (type: string) => {
        switch (type) {
            case "back":
                const mainIndex = categoryTotal.findIndex(item => item.main === mainPage.current.now);
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === subPage.current.prev);
                const detailIndex = categoryTotal[mainIndex].detail[subIndex].findIndex(item => item === myPageDetail.current.prev);
                subPage.current = {
                    ...subPage.current,
                    now: myPageDetail.current.prev}
                dispatch(setCategoryValue({
                    ...categoryValue,
                    sub: categoryTotal[mainIndex].sub[subIndex],
                    detail: categoryTotal[mainIndex].detail[subIndex][detailIndex],
                    detail_1: categoryTotal[mainIndex].detail_1[subIndex][detailIndex][0],
                }));
                navigation.goBack();
                break;
            case "edit":
                console.log("편집");
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
            <Pressable onPress={() => pressBtn("edit")}>
                <Image style={styles.rightIcon} source={require("../../../assets/image/write.png")}/>
            </Pressable>
        </View>
    )
};

export default EditTop;