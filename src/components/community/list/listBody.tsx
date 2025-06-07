//기타
import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Pressable, Text, View } from "react-native"

//Type
import { NavigateType } from "../../../types/navigateTypes";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

//컴포넌트
import ListScroll from "./listScroll";
import ListSwitch from "../../common/useElement/top/listSwitch";

//Context
import { useCommon } from "../../../context/commonContext";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

//style
import styles from "@styles/community/list/listBody.style";
import { useCategory } from "../../../hooks/useCategory";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

function ListBody(): React.JSX.Element{
    const [listState, setListState] = useState(false);
    const {categoryTotal, prev, success} = useCommon();
    const {categoryChange} = useCategory();
    const [isList, setIsList] = useState(false);
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);

    const navigation = useNavigation<NavigationProps>();

    useEffect(() => {
        if(categoryValue.main === "Community" && categoryValue.sub === "List"){
            setIsList(true);
        }else{
            setIsList(false);
        }
    }, [categoryValue]);

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "Community");
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "List");
                const detailIndex = categoryTotal[mainIndex].detail[subIndex].findIndex((item) => 
                        item === prev.current.find((item) => item.main === "Community" && item.sub === "List")?.detail);
                categoryChange(mainIndex, subIndex, detailIndex, 0);
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    );

    const goWrite = () => {
        prev.current = [categoryValue]
        navigation.navigate("Community", {
            screen: "Write",
        });
    }

    return(
        <View style={styles.container}>
            <TextInput style={styles.searchBox} placeholder="입력하세요..."/>
            {isList &&
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