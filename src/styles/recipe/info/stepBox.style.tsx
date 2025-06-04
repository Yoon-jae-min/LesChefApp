import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
        width: screenWidth * 0.93,
        flexDirection: "column",
        alignItems: "center",
    },
    title:{
        fontFamily: "Kavoon-Regular",
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgb(160, 160, 160)",
        width: 50,
        textAlign: "center",
    },
    unitBox:{
        borderWidth: 1,
        flexDirection: "row",
        width: "100%",
        minHeight: 120,
        marginTop: 10,
        borderRadius: 5,
        borderColor: "rgb(120, 120, 120)"
    },
    img:{
        borderWidth: 1,
        height: 106,
        width: 106,
        resizeMode: "contain",
        marginTop: 6,
        marginLeft: 6,
        marginRight: 6,
        borderRadius: 3,
        borderColor: "rgb(160, 160, 160)"
    },
    descript:{
        width: (screenWidth * 0.93) - 130
    },
    stepNum:{
        marginTop: 5,
        marginBottom: 3,
        fontSize: 15,
        fontFamily: "SourceSerif4-Bold"
    },
    content:{
        marginLeft: 2,
        fontSize: 13,
        fontFamily: "SourceSerif4-Light"
    }
});

export default styles;