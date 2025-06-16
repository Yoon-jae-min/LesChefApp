import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        width: "100%",
        height: 102,
        marginTop: 7,
        marginBottom: 10,
        borderRadius: 5,
        borderColor: "rgb(91, 91, 91)",
        flexDirection: "row",
        alignItems: "center"
    },
    imgBox:{
        height: 100,
        width: 94,
    },
    infoBox:{
        height: 100,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    nameBox:{
        height: 100,
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
    },
    centerBox:{
        height: 50,
        width: "34%",
        alignItems: "center",
        justifyContent: "space-around",
    },
    btnBox:{
        height: 100,
        width: "36%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    line:{
        borderWidth: 0.5,
        height: 70,
        borderColor: "rgb(183, 183, 183)"
    },
    itemImg:{
        margin: 4,
        height: 90,
        width: 90,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "rgb(145, 145, 145)"
    },
    infoText:{
        fontFamily: "Jua-Regular"
    },
    btnImg:{
        width: 25,
        height: 25,
    }
});

export default styles;