//기타
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

//컴포넌트
import Top from "./top";
import MenuBox from "./menuBox"; 

function Page(): React.JSX.Element{
    const [menuActive, setMenuActive] = useState(false);

    return(
        <React.Fragment>
            <View style={{flex: 1}}>
                <Top menuActive={menuActive} setMenuActive={setMenuActive}/>
                <MenuBox menuActive={menuActive}/>
                <View style={styles.container}>
                    <Text style={{color: "#fff"}}>Hello hi!!!</Text>
                </View>
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
});

export default Page;