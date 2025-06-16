//기타
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

//style
import styles from "@styles/common/useElement/btnAndTitle/titleTop.style";

//Context
import { useCommon } from "../../../../context/commonContext";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../../types/commonTypes";
import { NavigateType } from "../../../../types/navigateTypes";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    selectedTitle: string;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
}

function LikeTop(props: Props): React.JSX.Element{
    const {selectedTitle, categoryValue, categoryTotal} = props;
    const {prev} = useCommon();
    const {categoryChange} = useCategory();
    const navigation = useNavigation<NavigationProps>();

    const pressBtn = (type: string) => {
        switch (type) {
            case "back":
                const mainIndex = categoryTotal.findIndex(item => item.main === categoryValue.main);
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => 
                    categoryValue.main === "MyPage" ? item === "WishList" : item === "List");
                const detailIndex = categoryTotal[mainIndex].detail[subIndex].findIndex(item => 
                    item === prev.current.find((item) => 
                        item.main === "MyPage" ? item.sub === "WishList" : item.sub === "List")?.detail);
                categoryChange(mainIndex, subIndex, detailIndex, 0);
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
                <Image style={styles.leftIcon} source={require("../../../../assets/image/back.png")}/>
            </Pressable>
            <Text style={[styles.center, styles.title]}>{selectedTitle}</Text>
            <Pressable onPress={() => pressBtn("like")}>
                {categoryValue.main === "Community" ? 
                    <Image style={styles.rightIcon} source={require("../../../../assets/image/thumb.png")}/>:
                    <Image style={styles.rightIcon} source={require("../../../../assets/image/unlike.png")}/>}
            </Pressable>
        </View>
    )
}

export default LikeTop;