//기타
import React from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Component
import TitleTop from "../../common/body/titleTop";

//Context
import { useCommon } from "../../../context/commonContext";
import { useCommunity } from "../../../context/communityContext";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCategoryValue } from "../../../redux/commonSlice";


function WriteBody(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const listType = useCommunity().communityLT;
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
                listType={listType}
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

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "93%",
        alignItems: "center",
        marginTop: 7,
    },
    iconBox:{
        flexDirection: "row",
        width: "97%",
        height: 30,
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 3,
    },
    alignBox:{
        flexDirection: "row",
        height: 25,
        width: 85,
        justifyContent: "space-between"
    },
    icon:{
        width: 25,
        height: 25,
        resizeMode: "contain",
    },
    textInput:{
        borderWidth: 1,
        width: "100%",
        flex: 1,
        marginBottom: 7,
        borderRadius: 5,
    }
})

export default WriteBody;