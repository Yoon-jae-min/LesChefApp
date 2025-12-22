//기타
import React, { useState } from "react";
import { Image, Pressable, TextInput, View, Alert } from "react-native";
import { validateText } from "../../../../utils/validation";

//Style
import styles from "@styles/common/useElement/btnAndTitle/titleTop.style";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../../types/commonTypes";
import { NavigateType } from "../../../../types/navigateTypes";

//Navigation
import { useNavigation } from "@react-navigation/native";

//Context
import { useCommon } from "../../../../context/commonContext";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    selectedTitle: string;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
}

function UploadTop(props: Props): React.JSX.Element{
    const {selectedTitle, categoryValue, categoryTotal} = props;
    const {prev} = useCommon();
    const {categoryChange} = useCategory();
    const navigation = useNavigation<NavigationProps>();
    const [title, setTitle] = useState("");

    const validateAndUpload = () => {
        // 제목 검증
        const titleError = validateText.required(title, "제목");
        if (titleError) {
            Alert.alert("입력 오류", titleError);
            return;
        }

        const titleLengthError = validateText.maxLength(title, 100, "제목");
        if (titleLengthError) {
            Alert.alert("입력 오류", titleLengthError);
            return;
        }

        // TODO: 실제 업로드 로직 구현
        console.log("업로드:", title);
        Alert.alert("성공", "업로드가 완료되었습니다.");
    }

    const pressBtn = (type: string) => {
        switch (type) {
            case "back":
                const mainIndex = categoryTotal.findIndex(item => item.main === categoryValue.main);
                const subIndex = categoryTotal[mainIndex].sub
                        .findIndex(item => item === prev.current[prev.current.length - 1].sub);
                const detailIndex = categoryTotal[mainIndex].detail[subIndex].findIndex((item) => 
                    item === prev.current[prev.current.length - 1].detail);   
                categoryChange(mainIndex, subIndex, detailIndex, 0);
                navigation.goBack();
                break;
            case "upload":
                validateAndUpload();
                break;
            default:
                break;
        }
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={() => pressBtn("back")}>
                <Image style={styles.leftIcon} source={require("../../../../assets/image/back.png")}/>
            </Pressable>
            <TextInput 
                style={[styles.center, styles.inputTitle]} 
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                maxLength={100}
            />
            <Pressable onPress={() => pressBtn("upload")}>
                <Image style={styles.rightIcon} source={require("../../../../assets/image/upload.png")}/>
            </Pressable>
        </View>
    )
}

export default UploadTop;