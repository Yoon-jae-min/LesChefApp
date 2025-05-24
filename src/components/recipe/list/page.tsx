//기타
import React, { useEffect } from "react";
import { View } from "react-native";

//style
import styles from "@styles/recipe/list/page.style";

//Component
import ListBox from "./listBox";

//Context
import { useCommon } from "../../../context/commonContext";
import { useRecipe } from "../../../context/recipeContext";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCategoryValue } from "../../../redux/commonSlice";

function Page(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const {focus, recipeDetail} = useRecipe();
    const dispatch = useDispatch();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);

    useEffect(() => {
        const mainIndex = categoryTotal.findIndex(item => item.main === "Recipe");
        const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "List");
        const detailIndex = categoryTotal[mainIndex].detail[subIndex].findIndex(item => item === recipeDetail.current.now);

        const nextValue = {
            main: categoryTotal[mainIndex].main,
            sub: categoryTotal[mainIndex].sub[subIndex],
            detail: categoryTotal[mainIndex].detail[subIndex][detailIndex],
            detail_1: categoryTotal[mainIndex].detail_1[subIndex][detailIndex][0]
        }
        
        if(categoryValue.main !== nextValue.main || categoryValue.sub !== nextValue.sub){
            if(!focus.current){
                dispatch(setCategoryValue({
                    ...categoryValue,
                    ...nextValue
                }));
                focus.current = !focus.current;
            }
        }else{
            focus.current = !focus.current;
        }
    }, []);

    return(
        <View style={styles.container}>
            <ListBox/>
        </View>
    )
}

export default Page;