//기타
import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../../types/commonTypes";

//style
import {styles, pickerStyles} from "@styles/common/useElement/listSwitch.style";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

type Props = {
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
    setListState: React.Dispatch<React.SetStateAction<boolean>>;
}

function ListSwitch(props: Props): React.JSX.Element{
    const { categoryValue, categoryTotal, setListState } = props;
    const { categoryChange } = useCategory();
    const mainIndex = categoryTotal.findIndex(item => item.main === categoryValue.main);
    const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === categoryValue.sub);
    const [elements, setElements] = useState<string[]>([]);

    useEffect(() => {
        setElements(categoryTotal[mainIndex].detail[subIndex]);
    }, []);

    const indexCount = (value: string) => {
        return elements?.findIndex((item) => item === value);
    }

    const switchMenu = (arrow: string, value: string) => {
        let indexSave = indexCount(value);
        if(arrow === "left"){
            if(indexSave === 0) {
                indexSave = elements.length - 1;
            }else{
                indexSave -= 1;
            }
        }else if(arrow === "right"){
            if(indexSave === elements.length - 1){
                indexSave = 0;
            }else{
                indexSave += 1;
            }
        }
        const detailIndex = categoryTotal[mainIndex].detail[subIndex].findIndex(item => item === elements[indexSave]);

        categoryChange(mainIndex, subIndex, detailIndex, 0);
        setListState((prev) => (!prev));
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={() => switchMenu("left", categoryValue.detail)}>
                <Image style={styles.arrow} source={require("../../../../assets/image/leftArrow.png")}/>
            </Pressable>
            <RNPickerSelect
                style={pickerStyles}
                value={categoryValue.detail}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                items={categoryTotal[mainIndex].detail[subIndex].map((item) => ({label: item, value: item})) ?? []}
                onValueChange={(value) => switchMenu("center", value)}/>
            <Pressable onPress={() => switchMenu("right", categoryValue.detail)}>
                <Image style={styles.arrow} source={require("../../../../assets/image/rightArrow.png")}/>
            </Pressable>
        </View>
    )
}

export default ListSwitch;