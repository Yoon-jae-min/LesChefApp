//기타
import React, { useCallback } from "react";
import { FlatList, Text, View } from "react-native";

//Context
import { useCommon } from "../../../../context/commonContext";
import { useDummy } from "../../../../context/dummyContext";

//style
import styles from "@styles/myPage/body/storage/stroage.style";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

//Component
import SubSearch from "../../../common/useElement/searchBar/subSearch";
import ListSwitch from "../../../common/useElement/switchBar/listSwitch";
import ItemUnit from "./itemUnit";
import AddOrder from "./addOrder";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setCurrentList } from "../../../../redux/storageSlice";

function Storage(): React.JSX.Element{
    const {categoryTotal, success} = useCommon();
    const {categoryChange} = useCategory();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const storageListAll = useDummy().storageListData;
    const selectedList = useSelector((state: RootState) => state.storage.currentList);
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "Storage");
                categoryChange(mainIndex, subIndex, 0, 0);
                dispatch(setCurrentList(storageListAll[0]));
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    );

    return(
        <View style={styles.container}>
            <SubSearch/>
            <ListSwitch categoryTotal={categoryTotal} categoryValue={categoryValue}/>
            <AddOrder/>
            <FlatList
                style={styles.scroll}
                data={[]}
                renderItem={() => null}
                ListHeaderComponent={
                    <React.Fragment>
                        {selectedList.items.map((item, index) => 
                            <ItemUnit key={index} item={item}/>
                        )}
                    </React.Fragment>
                }
            />
        </View>
    )
}

export default Storage;