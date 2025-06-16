//기타
import React, { useEffect, useRef } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";

//style
import styles from "@styles/myPage/modal/imgSelect.style";


type Props = {
    addImg: (type: string) => void;
    imgSelectOpen: boolean;
}

function ImgSelect(props: Props){
    const {addImg, imgSelectOpen} = props;
    const translateX = useRef(new Animated.Value(-62)).current;

    useEffect(() => {
        if(imgSelectOpen){
            Animated.timing(translateX,{
                toValue: 10,
                duration: 600,
                useNativeDriver: true
            }).start();
        }else{
            Animated.timing(translateX,{
                toValue: -62,
                duration: 0,
                useNativeDriver: true
            }).start();
        }
    }, [imgSelectOpen]);

    return(
        <Animated.View style={[styles.container, {transform: [{translateX}]}]}>
            <Pressable style={styles.boxCommon} onPress={() => addImg("camera")}>
                <Image style={styles.btnImg} source={require("../../../../assets/image/camera.png")}/>
                <Text style={styles.btnText}>카메라</Text>
            </Pressable>
            <Pressable style={styles.boxCommon} onPress={() => addImg("gallery")}>
                <Image style={styles.btnImg} source={require("../../../../assets/image/gallery.png")}/>
                <Text style={styles.btnText}>갤러리</Text>
            </Pressable>
            <Pressable style={styles.boxCommon} onPress={() => addImg("cancel")}>
                <Image style={styles.btnImg} source={require("../../../../assets/image/cancel_DG.png")}/>
                <Text style={styles.btnText}>취소</Text>
            </Pressable>
        </Animated.View>
    )
}

export default ImgSelect;