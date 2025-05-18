import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        width: screenWidth * 0.93,
        marginTop: 10
    },
    title:{
        borderWidth: 1,
        borderColor: "rgb(160, 160, 160)",
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 5,
        borderRadius: 3,
        alignSelf: "flex-start",
        fontFamily: "Jua-Regular",
        fontSize: 20,
        color: "rgb(116, 116, 116)"
    },
    unitEach:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 17,
        marginRight: 13,
        height: 25,
        alignItems: "center",
    },
    ingreName:{
        height: 25,
        textAlignVertical: "center",
        fontFamily: "Jua-Regular",
        fontSize: 17
    },
    portionBox:{
        flexDirection: "row",
    },
    amount:{
        textAlignVertical: "center",
        height: 25,
        fontFamily: "Jua-Regular",
        fontSize: 17
    },
    unit:{
        textAlignVertical: "center",
        height: 25,
        marginLeft: 3,
        fontFamily: "Jua-Regular",
        fontSize: 17
    }
});

export default styles;