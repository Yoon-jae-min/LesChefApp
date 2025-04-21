//기타
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable } from "react-native";

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
    const [pageTrig, setPageTrig] = useState(false);
    const pageValue = useRef("Main");
    const pageSubValue = useRef("Default");
    const pageRender = useRef("Y");

    //페이지 렌더링
    const pageRenderTrig = () => {
        setPageTrig((prev) => (!prev));
    }

    return(
        <React.Fragment>
            <View style={styles.container}>
                <Top 
                    menuActive={menuActive} 
                    setMenuActive={setMenuActive} 
                    setPageTrig={setPageTrig} 
                    pageValue={pageValue} 
                    pageSubValue={pageSubValue}
                    pageRender={pageRender}/>
                <MenuBox 
                    menuActive={menuActive} 
                    pageValue={pageValue} 
                    pageSubValue={pageSubValue} 
                    setMenuActive={setMenuActive}
                    pageRender={pageRender}/>
                {menuActive && <Pressable onPress={() => setMenuActive(false)} style={styles.menuBackground}/>}
                <View style={styles.body}>
                    {(pageValue.current !== "MyPage" && pageSubValue.current === "default") && 
                            <TextInput style={styles.searchBox} placeholder="입력하세요..."/>}
                    {pageValue.current === "MyPage" && <SelectMyMenu/>}
                    {pageValue.current === "Main" && <PageMain/>}
                    {pageValue.current === "Recipe" && <PageRecipe/>}
                    {pageValue.current === "Community" && <PageBoard pageSubValue={pageSubValue} pageRenderTrig={pageRenderTrig}/>}
                    {pageValue.current === "MyPage" && <PageMy/>}
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
    },
    menuBackground:{
        zIndex: 5,
        position: "absolute",
        top: 70,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0)",
    }
});

export default Page;