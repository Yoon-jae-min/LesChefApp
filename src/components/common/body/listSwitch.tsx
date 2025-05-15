//기타
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";

//Redux
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";

type Props = {
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
    setListState: React.Dispatch<React.SetStateAction<boolean>>;
}

function ListSwitch(props: Props): React.JSX.Element{
    const { categoryValue, categoryTotal, setListState} = props;
    const elements = categoryValue.main === "Recipe" ? categoryTotal[1].detail[0] : categoryTotal[3].detail[0];
    const dispatch = useDispatch();

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

        dispatch(setCategoryValue({
            ...categoryValue,
            detail: elements[indexSave],
            detail_1: categoryValue.main === "Recipe" ?
                        categoryTotal[1]?.detail_1[0][indexSave][0] : 
                        categoryTotal[3]?.detail_1[0][indexSave][0]
        }))
        setListState((prev) => (!prev));
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={() => switchMenu("left", categoryValue.detail)}>
                <Image style={styles.arrow} source={require("../../../assets/image/leftArrow.png")}/>
            </Pressable>
            <RNPickerSelect
                style={pickerStyles}
                value={categoryValue.detail}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                items={categoryTotal
                    .find((item) => item.main === categoryValue.main)
                    ?.detail[0].map((item) => ({label: item, value: item})) ?? []
                }
                onValueChange={(value) => switchMenu("center", value)}/>
            <Pressable onPress={() => switchMenu("right", categoryValue.detail)}>
                <Image style={styles.arrow} source={require("../../../assets/image/rightArrow.png")}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
    },
    arrow:{
        width: 40,
        height: 40,
    }
})

const pickerStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: "Jua-Regular",
        fontSize: 22,
        padding: 12,
        width: 250,
        height: 50,
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
    },
    inputAndroid: {
        fontFamily: "Jua-Regular",
        fontSize: 22,
        padding: 12,
        width: 250,
        height: 50,
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
    },
})

export default ListSwitch;