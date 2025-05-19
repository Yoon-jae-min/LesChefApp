//기타
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";
import { NavigateType } from "src/types/navigateTypes";

//Redux
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";

//style
import styles from "@styles/myPage/top/selectMenu.style";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type NavigateProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
    setCategoryTrig: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectMenu(props: Props): React.JSX.Element{
    const {categoryValue, categoryTotal, setCategoryTrig} = props;
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigateProps>();

    const selectMenu = (index: number) => {
        dispatch(setCategoryValue({
            ...categoryValue,
            sub: categoryTotal[2].sub[index],
            detail: categoryTotal[2].detail[index][0],
            detail_1: categoryTotal[2].detail_1[index][0][0]
        }))
        setCategoryTrig((prev) => (!prev));

        navigation.navigate("MyPage", {
            screen: categoryTotal[2].sub[index] === "Info" ? "Info" :
                    categoryTotal[2].sub[index] === "Foods" ? "Foods" :
                    categoryTotal[2].sub[index] === "WishList" ? "WishList" :
                    "MyRecipe"
        });
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