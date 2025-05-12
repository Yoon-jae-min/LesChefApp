//기타
import React from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { SelectedBoardType } from "../../../types/boardTypes";
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";

//컴포넌트
import TitleTop from "../../common/body/titleTop";

type Props = {
    listType: React.RefObject<string>;
    selectedBoard: SelectedBoardType;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
    // setCategoryValue: React.Dispatch<React.SetStateAction<CategoryValueType>>;
}

function WriteBody(props: Props): React.JSX.Element{
    const {listType, selectedBoard, categoryValue, categoryTotal} = props;

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