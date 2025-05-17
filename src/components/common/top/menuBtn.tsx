//기타
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable } from "react-native";

//style
import styles from "@styles/common/top/menuBtn.style";

type Props = {
    menuActive: boolean;
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuBtn(props: Props): React.JSX.Element{
    const [animating, setAnimating] = useState(false);
    const isFirstRender = useRef(true);
    
    const {menuActive, setMenuActive} = props;

    const topLineAni = useRef(new Animated.Value(0)).current;
    const middleLineAni = useRef(new Animated.Value(1)).current;
    const bottomLineAni = useRef(new Animated.Value(0)).current;
    const topLineTranslateY = useRef(new Animated.Value(0)).current;
    const bottomLineTranslateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender.current = false;
            return
        }else{
            menuAnimate();
        }
    },[menuActive]);

    const menuAnimate = () => {
        if(menuActive){
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
            setMenuActive((prev) => (!prev));
            setAnimating(true);
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

export default MenuBtn;