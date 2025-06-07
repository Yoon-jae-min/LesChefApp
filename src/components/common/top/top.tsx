//기타
import React from "react";
import { Image, Pressable, View } from "react-native";

//Type
import { NavigateType } from "../../../types/navigateTypes";

//Navigation
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Component
import MenuBtn from "./menuBtn";

//style
import styles from "@styles/common/top/top.style";

//Context
import { useCommon } from "../../../context/commonContext";

type Props = {
    menuActive: boolean;
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

type NavigateProps = NativeStackNavigationProp<NavigateType>;

function Top(props: Props): React.JSX.Element{
    const {menuActive, setMenuActive} = props;
    const {mainPage, subPage} = useCommon();
    const navigation = useNavigation<NavigateProps>();

    const goHome = () => {
        setMenuActive(false);
        // mainPage.current = {
        //     ...mainPage.current,
        //     now: "Main"}
        // subPage.current = {
        //     ...subPage.current,
        //     now: "Default"
        // }
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

export default Top;