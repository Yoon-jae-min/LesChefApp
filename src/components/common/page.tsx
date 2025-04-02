//기타
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";

//컴포넌트
import Top from "./top/top";
import MenuBox from "./menu/menuBox"; 
import SelectMyMenu from "../myPage/selectMenu";
import PageMain from "../main/pageMain";
import PageRecipe from "../recipe/pageRecipe";
import PageMy from "../myPage/pageMy";
import PageBoard from "../board/pageBoard";

function Page(): React.JSX.Element{
    const [menuActive, setMenuActive] = useState(false);

    return(
        <React.Fragment>
            <View style={styles.container}>
                <Top menuActive={menuActive} setMenuActive={setMenuActive}/>
                <MenuBox menuActive={menuActive}/>
                <View style={styles.body}>
                    <TextInput style={styles.searchBox} placeholder="입력하세요..."/>
                    {/* <SelectMyMenu/> */}
                    {/* <PageMain/> */}
                    <PageRecipe/>
                    {/* <PageBoard/> */}
                    {/* <PageMy/> */}
                </View>
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: "relative",
    },
    body:{
        flex: 1,
        backgroundColor: "#fff",
    },
    searchBox:{
        width: "90%",
        height: 44,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: 5,
        marginBottom: 10,
        textAlign: "center",
        borderColor: "rgba(81, 81, 81, 1)",
        borderWidth: 1,
        borderRadius: 10,
        color: "rgba(160, 160, 160, 1)"
    }
});

export default Page;