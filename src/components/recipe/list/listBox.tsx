//기타
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { View } from "react-native";

//Component
import ListSwitch from "../../common/useElement/listSwitch";
import SelectSubCg from "../../common/useElement/selectSubCg";
import ListScroll from "./listScroll";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

//Context
import { useCommon } from "../../../context/commonContext";

//style
import styles from "@styles/recipe/list/listBox.style";

function ListBox(): React.JSX.Element{
    const [listState, setListState] = useState(false);
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);

    return(
        <View style={styles.container}>
            {categoryValue.main === "Recipe" && <TextInput style={styles.searchBox} placeholder="입력하세요..."/>}
            <ListSwitch categoryValue={categoryValue} categoryTotal={categoryTotal} setListState={setListState}/>
            {(categoryValue.detail !== "Other") && 
                    <SelectSubCg 
                        categoryTotal={categoryTotal} 
                        categoryValue={categoryValue}
                        setListState={setListState}/>}
            <ListScroll/>
        </View>
    )
}

export default ListBox;