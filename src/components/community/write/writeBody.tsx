//기타
import React from "react";
import { Image, Pressable, TextInput, View } from "react-native";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Component
import TitleTop from "../../common/useElement/titleTop";

//Context
import { useCommon } from "../../../context/commonContext";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCategoryValue } from "../../../redux/commonSlice";

//style
import styles from "@styles/community/write/writeBody.style";

function WriteBody(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard);
    const dispatch = useDispatch();

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Community");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Write");
        const nextValue = {
            main: categoryTotal[mainIndex].main,
            sub: categoryTotal[mainIndex].sub[subIndex],
            detail: categoryTotal[mainIndex].detail[subIndex][0],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0]
        };

        if((nextValue.main !== categoryValue.main) || (nextValue.sub !== categoryValue.sub)){
            dispatch(setCategoryValue({
                ...categoryValue,
                ...nextValue
            }));
        }
    });

    return(
        <View style={styles.container}>
            <TitleTop
                selectedTitle={selectedBoard.title}
                categoryValue={categoryValue}
                categoryTotal={categoryTotal}/>
            <View style={styles.iconBox}>
                <Pressable>
                    <Image style={styles.icon} source={require("../../../assets/image/addImg.png")}/>
                </Pressable>
                <View style={styles.alignBox}>
                    <Pressable>
                        <Image style={styles.icon} source={require("../../../assets/image/textAlignLeft.png")}/>
                    </Pressable>
                    <Pressable>
                        <Image style={styles.icon} source={require("../../../assets/image/textAlignCenter.png")}/>
                    </Pressable>
                    <Pressable>
                        <Image style={styles.icon} source={require("../../../assets/image/textAlignRight.png")}/>
                    </Pressable>
                </View>
            </View>
            <TextInput style={styles.textInput}/>
        </View>
    )
}

export default WriteBody;