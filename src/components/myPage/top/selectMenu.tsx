//기타
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";
import { NavigateType } from "src/types/navigateTypes";

//style
import styles from "@styles/myPage/top/selectMenu.style";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

//hooks
import { useCategory } from "../../../hooks/useCategory";

//Context
import { useCommon } from "../../../context/commonContext";

type NavigateProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
}

function SelectMenu(props: Props): React.JSX.Element{
    const {categoryValue, categoryTotal} = props;
    const {prev} = useCommon();
    const {categoryChange} = useCategory();
    const navigation = useNavigation<NavigateProps>();

    const selectMenu = (index: number) => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
        const subIndex = index;
        categoryChange(mainIndex, subIndex, 0, 0);

        prev.current = [{
            main: categoryTotal[mainIndex].main,
            sub: categoryTotal[mainIndex].sub[subIndex],
            detail: categoryTotal[mainIndex].detail[subIndex][0],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0]
        }]

        navigation.reset({
            index: 1,
            routes: [
                {name: "Main"},
                {name: "MyPage", state: {index: 0, routes: [{name: categoryTotal[mainIndex].sub[index]}]}}
            ]
        })
    }

    return(
        <View style={styles.container}>
            {categoryTotal[2].sub.filter((item, index) => index < 4).map((item, index) => (
                <React.Fragment key={index}>
                    <TouchableOpacity
                        style={styles.element}
                        onPress={() => selectMenu(index)}>
                        <Text style={categoryValue.sub === item ? styles.selected : styles.nonSelected}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                    {index < 3 && <View style={styles.sepaator}/>}
                </React.Fragment>
            ))}
        </View>
    )
}

export default SelectMenu;