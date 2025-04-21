//기타
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

//컴포넌트
import MenuBtn from "./menuBtn";

interface PageProps{
    menuActive: boolean;
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
    setPageTrig: React.Dispatch<React.SetStateAction<boolean>>;
    pageValue: React.RefObject<string>;
    pageSubValue: React.RefObject<string>;
    pageRender: React.RefObject<string>;
}

function Top(props: PageProps): React.JSX.Element{
    const {menuActive, setMenuActive, setPageTrig, pageValue, pageSubValue, pageRender} = props;

    const goHome = () => {
        pageRender.current === "N";
        pageValue.current = "Main";
        pageSubValue.current = "default";
        setPageTrig((prev) => (!prev));
        setMenuActive(false);
    }

    return(
        <View style={styles.body}>
            <Pressable onPress={goHome} style={styles.logoBox} >
                <Image style={styles.logo}  source={require('../../../assets/image/LesChef_Logo.png')}/>
            </Pressable>
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
    logoBox: {
        width: "35%",
        height: "100%",
    },
    logo:{
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    }
})

export default Top;