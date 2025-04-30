//기타
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

//컴포넌트
import MenuBtn from "./menuBtn";

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
    menuActive: boolean;
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
    setCategoryValue: React.Dispatch<React.SetStateAction<categoryValueType>>;
    categoryTotal: categoryTotalType[];
}

function Top(props: Props): React.JSX.Element{
    const {menuActive, setMenuActive, setCategoryValue, categoryTotal} = props;

    const goHome = () => {
        setCategoryValue({
            main: categoryTotal[0].main,
            sub: categoryTotal[0].sub[0],
            detail: categoryTotal[0].detail[0][0],
            detail_1: categoryTotal[0].detail_1[0][0][0]
        });
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