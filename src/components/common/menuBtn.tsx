//기타
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

interface TopProps{
    menuActive: boolean;
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuBtn(props: TopProps): React.JSX.Element{
    const [animating, setAnimating] = useState(false);
    
    const {menuActive, setMenuActive} = props;

    const topLineAni = useRef(new Animated.Value(0)).current;
    const middleLineAni = useRef(new Animated.Value(1)).current;
    const bottomLineAni = useRef(new Animated.Value(0)).current;
    const topLineTranslateY = useRef(new Animated.Value(0)).current;
    const bottomLineTranslateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        menuAnimate();
    },[menuActive]);

    const menuAnimate = () => {
        if(!menuActive){
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(topLineTranslateY, {
                        toValue: 6.5,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bottomLineTranslateY, {
                        toValue: -6.5,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(middleLineAni, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: false,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(topLineAni,{
                        toValue: 45,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bottomLineAni,{
                        toValue: 45,
                        duration: 300,
                        useNativeDriver: true,
                    })
                ]),
            ]).start();
        }else{
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(topLineAni,{
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bottomLineAni,{
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    })
                ]),
                Animated.parallel([
                    Animated.timing(topLineTranslateY, {
                        toValue:0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bottomLineTranslateY, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(middleLineAni, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: false,
                    }),
                ]),
            ]).start();
        }
        setAnimating(false);
    }

    const touchMenuBtn = () => {
        if(!animating){
            setAnimating(true);
            setMenuActive((prev) => (!prev));
            menuAnimate();
        }
    }

    return(
        <Pressable style={styles.container} onPress={touchMenuBtn}>
            <Animated.View style={[
                styles.line,
                {transform:[
                    {translateY: topLineTranslateY}, 
                    { rotate: topLineAni.interpolate({inputRange: [0, 45], outputRange: ['0deg', '-45deg']})}
                ]}
            ]}/>
            <Animated.View style={[
                styles.line,
                {opacity: middleLineAni},
            ]}/>
            <Animated.View style={[
                styles.line,
                {transform: [
                    {translateY: bottomLineTranslateY}, 
                    { rotate: bottomLineAni.interpolate({inputRange: [0, 45], outputRange: ['0deg', '45deg']})}
                ]}
            ]}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        aspectRatio: 1.2 / 1,
        height: 15,
        marginRight: 20,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    line: {
        width: "100%",
        height: 0,
        borderColor: "#000",
        borderWidth: 0.8,
    }
});

export default MenuBtn;