//기타
import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../../types/commonTypes";

//style
import {styles, pickerStyles} from "@styles/common/useElement/switchBar/listSwitch.style";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

//Redux
import { useDispatch } from "react-redux";
import { setCurrentList } from "../../../../redux/storageSlice";
import { useDummy } from "../../../../context/dummyContext";

type Props = {
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
}

function ListSwitch(props: Props): React.JSX.Element{
    const { categoryValue, categoryTotal } = props;
    const { categoryChange } = useCategory();
    const mainIndex = categoryTotal.findIndex(item => item.main === categoryValue.main);
    const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === categoryValue.sub);
    const [elements, setElements] = useState<string[]>([]);
    const [element, setElement] = useState(categoryValue.sub === "Storage" ? elements[0] : categoryValue.detail);
    const dispatch = useDispatch();
    const storageListAll = useDummy().storageListData;

    useEffect(() => {
        if(categoryValue.sub === "Storage"){
            setElements(["냉장고", "서랍", "김치냉장고"]);
        }else{
            setElements(categoryTotal[mainIndex].detail[subIndex]);
        }
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
        const detailIndex = categoryValue.sub === "Storage" ? 0 :
            categoryTotal[mainIndex].detail[subIndex].findIndex(item => item === elements[indexSave]);

        if(categoryValue.sub === "Storage"){
            dispatch(setCurrentList(storageListAll[indexSave]));
        }

        categoryChange(mainIndex, subIndex, detailIndex, 0);
        setElement(elements[indexSave]);
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={() => switchMenu("left", element)}>
                <Image style={styles.arrow} source={require("../../../../assets/image/leftArrow.png")}/>
            </Pressable>
            <RNPickerSelect
                style={pickerStyles}
                value={element}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                items={elements.map(item => ({label: item, value: item}))}
                onValueChange={(value) => switchMenu("center", value)}/>
            <Pressable onPress={() => switchMenu("right", element)}>
                <Image style={styles.arrow} source={require("../../../../assets/image/rightArrow.png")}/>
            </Pressable>
        </View>
    )
}

export default ListSwitch;