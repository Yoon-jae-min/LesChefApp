//기타
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";
import { NavigateType } from "../../../types/navigateTypes";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

//Redux
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";

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
    const {mainIndex, mainTxt, subTxts, setMenuActive, categoryValue, categoryTotal} = props;
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigateProps>();

    const pageTouch = (subValue: string) => {
        setMenuActive(false);
        switch (mainTxt) {
            case "Main":
                navigation.navigate("Main");
                break;
            case "Recipe":
                const recipeMain = categoryTotal.findIndex(item => item.main === mainTxt);
                const recipeSub = categoryTotal[recipeMain].sub.findIndex(item => item === "List");
                const recipeDetail = categoryTotal[recipeMain].detail[recipeSub].findIndex(item => item === subValue);

                dispatch(setCategoryValue({
                    ...categoryValue,
                    main: categoryTotal[mainIndex].main,
                    sub: categoryTotal[mainIndex].sub[recipeSub],
                    detail: categoryTotal[mainIndex].detail[recipeSub][recipeDetail],
                    detail_1: categoryTotal[mainIndex].detail_1[recipeSub][recipeDetail][0]
                }));

                navigation.navigate("Recipe", {
                    screen: "List",
                });
                break;
            case "MyPage":
                const myMain = categoryTotal.findIndex(item => item.main === "MyPage");
                const mySub = categoryTotal[myMain].sub.findIndex(item => item === subValue);

                dispatch(setCategoryValue({
                    ...categoryValue,
                    main: categoryTotal[myMain].main,
                    sub: categoryTotal[myMain].sub[mySub],
                    detail: categoryTotal[myMain].detail[mySub][0],
                    detail_1: categoryTotal[myMain].detail_1[mySub][0][0]
                }));

                navigation.navigate("MyPage");
                break;
            case "Community":
                navigation.navigate("Community", {
                    screen: "List",
                });
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

const styles = StyleSheet.create({
    container:{
        width: 220,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
    },
    mainTxt: {
        fontFamily: "Kavoon-Regular",
        fontSize: 20,
        marginBottom: 6,
    },
    subTxt: {
        fontFamily: "Wellfleet-Regular",
        fontSize: 17,
        marginLeft: 10,
        marginBottom: 5,
    },
    pressBox:{
        alignSelf: "flex-start",
    }
})

export default CategoryGrp;