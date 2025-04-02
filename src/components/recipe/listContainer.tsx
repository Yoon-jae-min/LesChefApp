//기타
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

//컴포넌트
import SwitchTop from "../common/body/switchTop";

function ListContainer(): React.JSX.Element{
    const elements = ["Korean", "Japanese", "Chinese", "Western", "Other"];

    return(
        <View style={styles.container}>
            <SwitchTop elements={elements}/>
            <ScrollView style={styles.list} contentContainerStyle={styles.listAlign}>

            </ScrollView>
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

export default ListContainer;