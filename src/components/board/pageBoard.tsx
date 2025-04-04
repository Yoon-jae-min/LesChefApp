//기타
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

//컴포넌트
import SwitchTop from "../common/body/switchTop";

function PageBoard(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <SwitchTop elements={["Notice", "Board"]}/>
            <ScrollView style={styles.list}></ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
    },
    list:{
        flex: 1,
        width: "93%",
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1
    },
    listAlign:{

    }
})

export default PageBoard;

