//기타
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../../types/commonTypes";
import { NavigateType } from "../../../../types/navigateTypes";

//style
import styles from "@styles/common/useElement/btnAndTitle/titleTop.style";

//Context
import { useCommon } from "../../../../context/commonContext";

//Navigation
import { useNavigation } from "@react-navigation/native";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    selectedTitle: string;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
}

function EditTop(props: Props): React.JSX.Element{
    const {selectedTitle, categoryTotal} = props;
    const {prev} = useCommon();
    const {categoryChange} = useCategory();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const navigation = useNavigation<NavigationProps>();

    const pressBtn = (type: string) => {
        const mainIndex = categoryTotal.findIndex(item => item.main === categoryValue.main);
        switch (type) {
            case "back":
                const subIndexB = categoryTotal[mainIndex].sub.findIndex(item => 
                    item === prev.current[0].sub);
                const detailIndex = categoryTotal[mainIndex].detail[subIndexB].findIndex(item => 
                    item === prev.current[0].detail);
                categoryChange(mainIndex, subIndexB, detailIndex, 0);
                navigation.goBack();
                break;
            case "edit":
                const subIndexE = categoryTotal[mainIndex].sub.findIndex(item => item === "RecipeWrite");
                prev.current = prev.current.length >= 2 ? [...prev.current] : [...prev.current, categoryValue];
                categoryChange(mainIndex, subIndexE, 0, 0);
                navigation.navigate("MyPage", {
                    screen: "RecipeWrite"
                })
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
            <Pressable onPress={() => pressBtn("edit")}>
                <Image style={styles.rightIcon} source={require("../../../../assets/image/write.png")}/>
            </Pressable>
        </View>
    )
};

export default EditTop;