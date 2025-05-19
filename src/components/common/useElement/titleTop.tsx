//기타
import React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";
import { NavigateType } from "../../../types/navigateTypes";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

//Redux
import { useDispatch } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";

//style
import styles from "@styles/common/body/titleTop.style";

//context
import { useCommon } from "../../../context/commonContext";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    selectedTitle: string;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
}

function TitleTop(props: Props): React.JSX.Element{
    const { selectedTitle, categoryValue, categoryTotal} = props;
    const {mySubValue} = useCommon();
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProps>();

    const pressBtn = (type: string) => {
        switch (type) {
            case "back":
                const mainIndex = categoryTotal.findIndex(item => item.main === categoryValue.main);
                const subIndex = categoryTotal[mainIndex].sub.
                    findIndex(item => categoryValue.main === "MyPage" ? 
                        item === mySubValue.current  : item === "List");
                
                dispatch(setCategoryValue({
                    ...categoryValue,
                    sub: categoryTotal[mainIndex].sub[subIndex],
                    detail: categoryTotal[mainIndex].detail[subIndex][0],
                    detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0],
                }));

                switch(categoryValue.main){
                    case "Recipe":
                        navigation.replace("Recipe",{
                            screen: "List"
                        })
                        break;
                    case "Community":
                        navigation.replace("Community",{
                            screen: "List",
                        })
                        break;
                    default:
                        break;
                }
                break;
            case "like":
                Toast.show({
                    type: "info",
                    text1: "좋아요 기능 추가 예정",
                    position: "bottom",
                })
                break;
            default:
                break;
        }
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={() => pressBtn("back")}>
                <Image style={styles.leftIcon} source={require("../../../assets/image/back.png")}/>
            </Pressable>
            {categoryValue.sub === "Info" && <Text style={[styles.center, styles.title]}>{selectedTitle}</Text>}
            {categoryValue.sub === "Write" && <TextInput style={[styles.center, styles.inputTitle]} placeholder="- title -"/>}
            <Pressable onPress={() => pressBtn("like")}>
                {categoryValue.sub === "Info" && 
                    (categoryValue.main === "Community" ? 
                        <Image style={styles.rightIcon} source={require("../../../assets/image/thumb.png")}/> :
                        <Image style={styles.rightIcon} source={require("../../../assets/image/unlike.png")}/>
                    )}
                {categoryValue.sub === "Write" && <Image style={styles.rightIcon} source={require("../../../assets/image/upload.png")}/>}
            </Pressable>
        </View>
    )
}

export default TitleTop;