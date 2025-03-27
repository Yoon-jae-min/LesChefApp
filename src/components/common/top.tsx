//기타
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

//컴포넌트
import MenuBtn from "./menuBtn";

interface PageProps{
    menuActive: boolean;
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function Top(props: PageProps): React.JSX.Element{
    const {menuActive, setMenuActive} = props;

    return(
        <View style={styles.body}>
            <Image style={styles.logo} source={require('../../assets/image/LesChef_Logo.png')}/>
            <MenuBtn menuActive={menuActive} setMenuActive={setMenuActive}/>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    logo:{
        width: "35%",
        height: "100%",
        resizeMode: "contain",
    }
})

export default Top;