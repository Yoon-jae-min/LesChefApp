//기타
import React, { useEffect, useRef } from "react";
import { Animated, Image, Text, View } from "react-native";

//컴포넌트
import CategoryGrp from "./categoryGrp";

//컨텍스트
import { useCommon } from "../../../context/commonContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

//style
import styles from "@styles/common/menu/menuBox.style";

type Props = {
    menuActive: Boolean;
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuBox(props: Props): React.JSX.Element{
    const {menuActive, setMenuActive} = props;
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const translateX = useRef(new Animated.Value(-250)).current;

    useEffect(() => {
        Animated.timing(translateX,{
            toValue: menuActive ? 0 : -250,
            duration: 600,
            useNativeDriver: true
        }).start();
    }, [menuActive]);

    return(
        <Animated.View style={[styles.container, {transform: [{translateX}]}]}>
            <View style={styles.profileBox}>
                <Image style={styles.profileImg} source={require("../../../assets/image/profile.png")}/>
                <View style={styles.profileTextBox}>
                    <Text style={styles.profileText}>로그인 해주세요</Text>
                </View>
            </View>
            <View style={styles.categoryBox}>
                {categoryTotal.map((item, index) => 
                    index !== 0 && (<CategoryGrp
                        key={index}
                        mainIndex={index}
                        setMenuActive={setMenuActive}
                        mainTxt={item.main}
                        subTxts={item.main === "Recipe" ? item.detail[0] : item.main === "MyPage" ? item.sub.slice(0, -2) : item.sub}
                        categoryValue={categoryValue}
                        categoryTotal={categoryTotal}/>)
                )}
            </View>
        </Animated.View>
    )
}

export default MenuBox;