//기타
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

interface PageProps{
    menuActive: Boolean;
}

function MenuBox(props: PageProps): React.JSX.Element{
    const {menuActive} = props;

    const translateX = useRef(new Animated.Value(-250)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(translateX,{
                    toValue: menuActive ? 0 : -250,
                    duration: 600,
                    useNativeDriver: true
                })
            ])
        ]).start();
    }, [menuActive]);

    return(
        <Animated.View style={[styles.container, {height: height - 55, transform: [{translateX}]}]}>

        </Animated.View>
    )
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        top: 55,
        width: 250,
        backgroundColor: "#E6D9D9D9",
        zIndex: 10,
    }
})

export default MenuBox;