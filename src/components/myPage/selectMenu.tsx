//기타
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function SelectMyMenu(): React.JSX.Element{
    const [selectedMenu, setSelectedMenu] = useState("My Info");

    const menuItems = ["My Info", "Wish List", "Foods", "My Recipe"]

    return(
        <View style={styles.container}>
            {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                    <TouchableOpacity
                        style={styles.element}
                        onPress={() => setSelectedMenu(item)}>
                        <Text style={selectedMenu === item ? styles.selected : styles.nonSelected}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                    {index !== menuItems.length - 1 && <View style={styles.sepaator}/>}
                </React.Fragment>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "90%",
        height: 44,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: 5,
        marginBottom: 20,
        borderColor: "rgba(81, 81, 81, 1)",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    element:{
        width: "25%",
        height: "75%",
        justifyContent: "center",
        alignItems: "center",
    },
    sepaator:{
        width: 1,
        height: "75%",
        backgroundColor: "rgba(160, 160, 160, 1)",
    },
    selected:{
        fontFamily: "SourceSerif4-Bold"
    },
    nonSelected:{
        color: "rgba(160, 160, 160, 1)",
        fontFamily: "SourceSerif4-Light"
    }
})

export default SelectMyMenu;