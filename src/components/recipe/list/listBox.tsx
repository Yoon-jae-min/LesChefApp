//기타
import React, { useState } from "react";
import { View } from "react-native";

//Component
import ListSwitch from "../../common/useElement/switchBar/listSwitch";
import SelectSubCg from "../../common/useElement/selectBar/selectSubCg";
import ListScroll from "./listScroll";
import MainSearch from "../../../components/common/useElement/searchBar/mainSearch";

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
            <MainSearch/>
            {(categoryValue.sub === "List" || categoryValue.sub === "WishList" || categoryValue.sub === "MyRecipe") && 
                <ListSwitch categoryValue={categoryValue} categoryTotal={categoryTotal}/>}
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