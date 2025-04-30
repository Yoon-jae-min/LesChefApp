//기타
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

interface categoryValueType{
    main: string;
    sub: string;
    detail: string;
    detail_1: string;
}

interface categoryTotalType{
    main: string;
    sub: string[];
    detail: string[][];
    detail_1: string[][][];
}

interface Props {
    mainIndex: number;
    mainTxt: string;
    subTxts: string[];
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
    setCategoryValue: React.Dispatch<React.SetStateAction<categoryValueType>>;
    categoryTotal: categoryTotalType[];
}

function CategoryGrp(props: Props): React.JSX.Element{
    const {mainIndex, mainTxt, subTxts, setMenuActive, setCategoryValue, categoryTotal} = props;

    const pageTouch = (subValue: string) => {
        const subIndex = mainTxt === "Recipe" ? 
                            categoryTotal[mainIndex].detail[0].findIndex(item => item === subValue) :
                            categoryTotal[mainIndex].sub.findIndex(item => item === subValue);
        setCategoryValue({
            main: categoryTotal[mainIndex].main,
            sub: mainTxt === "Recipe" ? categoryTotal[mainIndex].sub[0] : categoryTotal[mainIndex].sub[subIndex],
            detail: mainTxt === "Recipe" ? categoryTotal[mainIndex].detail[0][subIndex] : categoryTotal[mainIndex].detail[subIndex][0],
            detail_1: mainTxt === "Recipe" ? categoryTotal[mainIndex].detail_1[0][subIndex][0] : categoryTotal[mainIndex].detail_1[subIndex][0][0]
        });
        setMenuActive(false);
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={() => 
                    pageTouch(mainTxt === "Recipe" ? 
                    categoryTotal[mainIndex].detail[0][0] : 
                    categoryTotal[mainIndex].sub[0])} style={styles.pressBox}>
                        <Text style={styles.mainTxt}>{mainTxt}</Text>
            </Pressable>
            {mainTxt !== "Community" && subTxts.length > 0 && subTxts.map((text, index) => 
                <Pressable key={index} onPress={() => pageTouch(text)} style={styles.pressBox}><Text style={styles.subTxt}>{text}</Text></Pressable>
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