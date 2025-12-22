//기타
import React, { useCallback, useState } from "react";
import { Image, Pressable, TextInput, View } from "react-native";
import { validateText, sanitizeText } from "../../../utils/validation";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Component
import UploadTop from "../../common/useElement/btnAndTitle/uploadTop";

//Context
import { useCommon } from "../../../context/commonContext";
import { useCommunity } from "../../../context/communityContext";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

//style
import styles from "@styles/community/write/writeBody.style";

//hook
import { useCategory } from "../../../hooks/useCategory";

function WriteBody(): React.JSX.Element{
    const {categoryTotal, success} = useCommon();
    const {categoryChange} = useCategory();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard);
    const [content, setContent] = useState("");

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "Community");
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Write");
                categoryChange(mainIndex, subIndex, 0, 0);
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    );

    return(
        <View style={styles.container}>
            <UploadTop
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
            <TextInput 
                style={styles.textInput}
                value={content}
                onChangeText={(text) => {
                    // XSS 방지를 위한 기본 Sanitization (필요시)
                    setContent(text);
                }}
                maxLength={5000}
                multiline
                placeholder="내용을 입력하세요..."
            />
        </View>
    )
}

export default WriteBody;