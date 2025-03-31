//기타
import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

//컴포넌트
import Issue from "./issue";
import FoodPrice from "./foodPrice";

function PageMain(): React.JSX.Element{
    return(
        <ScrollView style={styles.container} contentContainerStyle={styles.containerAlign}>
            <Issue/>
            <FoodPrice/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    containerAlign:{
        alignItems: "center"
    }
})

export default PageMain;