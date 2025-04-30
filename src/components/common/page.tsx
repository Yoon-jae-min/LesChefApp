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

//pageCategory
const categoryTotal = [
    {
        main: "Main",
        sub: ["Default"],
        detail: [["Default"]],
        detail_1: [[["Default"]]], 
    },
    {
        main: "Recipe",
        sub: ["List", "Info"],
        detail: [["Korean", "Japanese", "Chinese", "Western", "Other"], ["Default"]],
        detail_1: [[["전체", "국/찌개", "밥/면", "반찬", "기타"],
                    ["전체", "국/전골", "밥", "면", "기타"],
                    ["전체", "튀김, 찜", "밥", "면", "기타"],
                    ["전체", "스프/스튜", "빵", "면", "기타"],
                    ["Default"]],[["Default"]]]
    },
    {
        main: "MyPage",
        sub: ["Info", "Foods", "WishList", "MyRecipe"],
        detail: [["Default"], 
                ["Default"], 
                ["Korean", "Japanese", "Chinese", "Western", "Other"], 
                ["Korean", "Japanese", "Chinese", "Western", "Other"]],
        detail_1: [[["Default"]],[["Default"]], 
                    [["전체", "국/찌개", "밥/면", "반찬", "기타"],
                    ["전체", "국/전골", "밥", "면", "기타"],
                    ["전체", "튀김, 찜", "밥", "면", "기타"],
                    ["전체", "스프/스튜", "빵", "면", "기타"],
                    ["Default"]],
                    [["전체", "국/찌개", "밥/면", "반찬", "기타"],
                    ["전체", "국/전골", "밥", "면", "기타"],
                    ["전체", "튀김, 찜", "밥", "면", "기타"],
                    ["전체", "스프/스튜", "빵", "면", "기타"],
                    ["Default"]]]
    },
    {
        main: "Community",
        sub: ["List", "Info", "Write"],
        detail: [["Notice", "Board"], ["Default"], ["Default"]],
        detail_1: [[["Default"], ["Default"]], [["Default"]], [["Default"]]]
    }
];

function Page(): React.JSX.Element{
    const [menuActive, setMenuActive] = useState(false);
    const [categoryValue, setCategoryValue] = useState({
        main: categoryTotal[0].main,
        sub: categoryTotal[0].sub[0],
        detail: categoryTotal[0].detail[0][0],
        detail_1: categoryTotal[0].detail_1[0][0][0]
    })

    return(
        <React.Fragment>
            <View style={styles.container}>
                <Top 
                    menuActive={menuActive} 
                    setMenuActive={setMenuActive} 
                    setCategoryValue={setCategoryValue}
                    categoryTotal={categoryTotal}/>
                <MenuBox 
                    menuActive={menuActive} 
                    setCategoryValue={setCategoryValue}
                    categoryTotal={categoryTotal}
                    setMenuActive={setMenuActive}/>
                {menuActive && <Pressable onPress={() => setMenuActive(false)} style={styles.menuBackground}/>}
                <View style={styles.body}>
                    {(categoryValue.main !== "MyPage" && 
                        (categoryValue.main === "Main" || categoryValue.sub === "List")) && 
                            <TextInput style={styles.searchBox} placeholder="입력하세요..."/>}
                    {categoryValue.main === "MyPage" && 
                        <React.Fragment>
                            <SelectMyMenu 
                                categoryValue={categoryValue} 
                                categoryTotal={categoryTotal} 
                                setCategoryValue={setCategoryValue}/>
                            <PageMy/>
                        </React.Fragment>}
                    {categoryValue.main === "Main" && 
                        <PageMain/>}
                    {categoryValue.main === "Recipe" && 
                        <PageRecipe categoryValue={categoryValue} categoryTotal={categoryTotal} setCategoryValue={setCategoryValue}/>}
                    {categoryValue.main === "Community" && 
                        <PageBoard categoryValue={categoryValue} categoryTotal={categoryTotal} setCategoryValue={setCategoryValue}/>}
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