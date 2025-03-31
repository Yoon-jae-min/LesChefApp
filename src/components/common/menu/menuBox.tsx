//기타
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";

//컴포넌트
import CategoryGrp from "./categoryGrp";

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
        <Animated.View style={[styles.container, {height: height - 70, transform: [{translateX}]}]}>
            <View style={styles.profileBox}>
                <Image style={styles.profileImg} source={require("../../../assets/image/profile.png")}/>
                <View style={styles.profileTextBox}>
                    <Text style={styles.profileText}>로그인 해주세요</Text>
                </View>
            </View>
            <View style={[styles.categoryBox, {height: height - 150}]}>
                <CategoryGrp mainTxt="Recipe" subTxts={["Korean", "Japanese", "Chinese", "Western"]}/>
                <CategoryGrp mainTxt="MyPage" subTxts={["Foods", "WishList", "MyRecipe"]}/>
                <CategoryGrp mainTxt="Community" subTxts={[]}/>
            </View>
        </Animated.View>
    )
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        top: 70,
        width: 250,
        backgroundColor: "#E6D9D9D9",
        zIndex: 10,
        flex: 1,
    },
    profileBox: {
        height: 80,
        flexDirection: "row",
    },
    profileImg:{
        width: 50,
        aspectRatio: 1/1,
        resizeMode: "contain",
        marginTop: 15,
        marginLeft: 15,
    },
    profileTextBox:{
        width: 160,
        height: 50,
        marginTop: 15,
        marginLeft: 10,
        justifyContent: "center",
    },
    profileText:{
        fontFamily: "Jua-Regular",
        fontSize: 20, 
        lineHeight: 17
    },
    categoryBox: {

    },
    categoryTxtM: {

    },
    categoryTxtS: {

    }
})

export default MenuBox;