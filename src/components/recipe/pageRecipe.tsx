//기타
import React from "react";
import { StyleSheet, View } from "react-native";

//컴포넌트
import ListContainer from "./listContainer";

interface categoryValueType{
    main: string;
    sub: string;
    detail: string;
    detail_1: string;
}

interface categoryTotalType{
    main: string;
    sub: string[];
    detail: string[][];
    detail_1: string[][][];
}

interface Props{
    categoryValue: categoryValueType;
    categoryTotal: categoryTotalType[];
    setCategoryValue: React.Dispatch<React.SetStateAction<categoryValueType>>;
}

function PageRecipe(props: Props): React.JSX.Element{
    const {categoryValue, categoryTotal, setCategoryValue} = props;

    return(
        <View style={styles.container}>
            <ListContainer categoryValue={categoryValue} categoryTotal={categoryTotal} setCategoryValue={setCategoryValue}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
})

export default PageRecipe;