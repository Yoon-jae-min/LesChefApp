//기타
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

interface menuBoxProps {
    mainTxt: string;
    subTxts: string[];
    pageValue: React.RefObject<string>;
    pageSubValue: React.RefObject<string>;
    pageRender: React.RefObject<string>;
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function CategoryGrp(props: menuBoxProps): React.JSX.Element{
    const {mainTxt, subTxts, pageValue, pageSubValue, pageRender, setMenuActive} = props;

    const pageTouch = () => {
        pageRender.current = "N";
        pageValue.current = mainTxt;
        // pageSubValue.current = subTxts[0];
        setMenuActive(false);
    }

    const pageSubTouch = (index: number) => {
        pageRender.current = "N";
        pageValue.current = mainTxt;
        pageSubValue.current = subTxts[index];
        setMenuActive(false);
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={pageTouch} style={styles.pressBox}><Text style={styles.mainTxt}>{mainTxt}</Text></Pressable>
            {mainTxt !== "Community" && subTxts.length > 0 && subTxts.map((text, index) => 
                <Pressable key={index} onPress={() => pageSubTouch(index)} style={styles.pressBox}><Text style={styles.subTxt}>{text}</Text></Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 220,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
    },
    mainTxt: {
        fontFamily: "Kavoon-Regular",
        fontSize: 20,
        marginBottom: 6,
    },
    subTxt: {
        fontFamily: "Wellfleet-Regular",
        fontSize: 17,
        marginLeft: 10,
        marginBottom: 5,
    },
    pressBox:{
        alignSelf: "flex-start",
    }
})

export default CategoryGrp;