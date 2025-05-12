//기타
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { NavigateType } from "../../../types/navigateTypes";
import { useNavigation } from "@react-navigation/native";

//컴포넌트
import MenuBtn from "./menuBtn";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
    menuActive: boolean;
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

type NavigateProps = NativeStackNavigationProp<NavigateType>;

function Top(props: Props): React.JSX.Element{
    const {menuActive, setMenuActive} = props;
    const navigation = useNavigation<NavigateProps>();

    const goHome = () => {
        setMenuActive(false);
        navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
        });
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