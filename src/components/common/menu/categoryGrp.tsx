//기타
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface menuBoxProps {
    mainTxt: String,
    subTxts: Array<String>,
}

function CategoryGrp(props: menuBoxProps): React.JSX.Element{
    const {mainTxt, subTxts} = props;

    return(
        <View style={styles.container}>
            <Text style={styles.mainTxt}>{mainTxt}</Text>
            {subTxts.length > 0 && subTxts.map((text, index) => 
                <Text key={index} style={styles.subTxt}>{text}</Text>
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
    }
})

export default CategoryGrp;