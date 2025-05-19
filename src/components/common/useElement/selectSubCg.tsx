//기타
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";

//Redux
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";

//style
import styles from "@styles/common/body/selectSubCg.style";

type Props = {
    categoryTotal: CategoryTotalType[];
    categoryValue: CategoryValueType;
    setListState: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectSubCg(props: Props): React.JSX.Element{
    const { categoryTotal, categoryValue, setListState} = props;
    const detailIndex = categoryTotal[1].detail[0].findIndex(item => item === categoryValue.detail);
    const dispatch = useDispatch();
    const elements = categoryTotal[1].detail_1[0][detailIndex];

    const touchMenu = (index: number) => {
        dispatch(setCategoryValue({
            ...categoryValue,
            detail_1: categoryTotal[1].detail_1[0][detailIndex][index]
        }));

        setListState((prev) => (!prev));
    }

    return(
        <View style={styles.container}>
            {elements?.map((item, index) => (
                <React.Fragment key={index}>
                    <TouchableOpacity 
                        style={[styles.element, categoryValue.detail_1 === item ? styles.selectE : styles.nonSelectE]}
                        onPress={() => touchMenu(index)}>
                        <Text style={[styles.txt, categoryValue.detail_1 === item ? styles.selectT : styles.nonSelectT]}>{item}</Text>
                    </TouchableOpacity>
                </React.Fragment>
            ))}
        </View>
    )
}

export default SelectSubCg;