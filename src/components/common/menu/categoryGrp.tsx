//기타
import React from "react";
import { Pressable, Text, View } from "react-native";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";
import { NavigateType } from "../../../types/navigateTypes";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

//style
import styles from "@styles/common/menu/categoryGrp.style";

//Context
import { useCommon } from "../../../context/commonContext";

//Redux
import { useCategory } from "../../../hooks/useCategory";

type NavigateProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    mainIndex: number;
    mainTxt: string;
    subTxts: string[];
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
}

function CategoryGrp(props: Props): React.JSX.Element{
    const {mainIndex, mainTxt, subTxts, setMenuActive, categoryTotal} = props;
    const {prev} = useCommon();
    const {categoryChange} = useCategory();
    const navigation = useNavigation<NavigateProps>();

    const pageTouch = (subValue: string) => {
        setMenuActive(false);
        const mainIndex = categoryTotal.findIndex(item => item.main === mainTxt);
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => mainTxt === "MyPage" ?
                            item === subValue : item === "List");
        const detailIndex = mainTxt === "Recipe" ? 
                        categoryTotal[mainIndex].detail[subIndex].findIndex(item => item === subValue) : 0;

        categoryChange(mainIndex, subIndex, detailIndex, 0);

        prev.current = [
            {
                main: categoryTotal[mainIndex].main,
                sub: categoryTotal[mainIndex].sub[subIndex],
                detail: categoryTotal[mainIndex].detail[subIndex][detailIndex],
                detail_1: categoryTotal[mainIndex].detail_1[subIndex][detailIndex][0]
            }
        ];
        
        switch (mainTxt) {
            case "Recipe":
                navigation.reset({
                    index: 1,
                    routes:[
                        {name: "Main"},
                        {name: "Recipe", state: {index: 0, routes: [{name: "List"}]}}
                    ]
                });
                break;
            case "MyPage":
                navigation.reset({
                    index: 1,
                    routes:[
                        {name: "Main"},
                        {name: "MyPage", state: {index: 0, routes: [{name: subValue}]}}
                    ]
                });
                break;
            case "Community":
                navigation.reset({
                    index: 1,
                    routes: [
                        {name: "Main"},
                        {name: "Community", state: {index: 0, routes: [{name: "List"}]}}
                    ]
                })
                break;
            default:
                break;
        }
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={() => 
                    pageTouch(mainTxt === "Recipe" ? 
                    categoryTotal[mainIndex].detail[0][0] : 
                    categoryTotal[mainIndex].sub[0])} style={styles.pressBox}>
                        <Text style={styles.mainTxt}>{mainTxt}</Text>
            </Pressable>
            {mainTxt !== "Community" && subTxts.length > 0 && subTxts.map((text, index) => 
                <Pressable key={index} onPress={() => pageTouch(text)} style={styles.pressBox}>
                    <Text style={styles.subTxt}>{text}</Text>
                </Pressable>
            )}
        </View>
    )
}

export default CategoryGrp;