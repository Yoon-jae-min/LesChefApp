//기타
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Pressable, Text, View } from "react-native"

//Type
import { NavigateType } from "../../../types/navigateTypes";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

//컴포넌트
import ListScroll from "./listScroll";
import ListSwitch from "../../common/useElement/listSwitch";

//Context
import { useCommon } from "../../../context/commonContext";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setCategoryValue } from "../../../redux/commonSlice";
import { RootState } from "../../../redux/store";

//style
import styles from "@styles/community/list/listBody.style";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

function ListBody(): React.JSX.Element{
    const [listState, setListState] = useState(false);
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const dispatch = useDispatch();

    const navigation = useNavigation<NavigationProps>();

    useFocusEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Community");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "List");
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

    const goWrite = () => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Community");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Write");

        dispatch(setCategoryValue({
            ...categoryValue,
            detail: categoryTotal[mainIndex].main,
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][0][0]
        }));
        
        navigation.navigate("Community", {
            screen: "Write",
        });
    }

    return(
        <View style={styles.container}>
            <TextInput style={styles.searchBox} placeholder="입력하세요..."/>
            {categoryValue.main === "Community" &&
                <ListSwitch
                    categoryValue={categoryValue} 
                    setListState={setListState}
                    categoryTotal={categoryTotal}/>}
                {(categoryValue.detail === "Board" 
                    // || (categoryValue.detail === "Notice" && "")
                    ) && 
                    <View style={styles.head}>
                        <Pressable style={styles.element} onPress={() => goWrite()}>
                            <Text style={styles.txt}>글쓰기</Text>
                        </Pressable>
                    </View>}
            <ListScroll/>
        </View>
    )
}

export default ListBody;