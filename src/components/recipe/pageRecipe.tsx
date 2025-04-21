//기타
import React from "react";
import { StyleSheet, View } from "react-native";

//컴포넌트
import ListContainer from "./listContainer";

function PageRecipe(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <ListContainer/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
})

export default PageRecipe;