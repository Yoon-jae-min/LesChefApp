import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
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
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        color: "rgba(160, 160, 160, 1)"
    },
    list:{
        flex: 1,
        width: "93%"
    },
    listAlign:{
        flexWrap: "wrap",
        flexDirection: "row",
    },
    element:{
        width: "44%",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "3%",
        marginRight: "3%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "rgb(71, 71, 71)",
        flexDirection: "column",
        alignItems: "center",
    },
    foodImgBox: {
        borderColor: "rgba(152, 152, 152, 0.5)",
        elevation: 4,
        borderWidth: 1,
        borderRadius: 3,
        marginTop: "7%",
        marginBottom: "3%",
        width: "86%",
        aspectRatio: 1 / 1
    },
    foodImg:{
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        aspectRatio: 1 / 1,
    },
    elementTxt:{
        fontFamily: "SourceSerif4-Bold",
    },
    foodName:{
        fontSize: 14,
        color: "rgb(90, 90, 90)"
    },
    subInfo:{
        width: "90%",
        height: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 7,
        marginBottom: 7,
    },
    subInfoImg:{
        width: 13,
        height: 13,
        resizeMode: "contain",
    },
    subInfoTxt:{
        height: 15,
        color: "rgba(160, 160, 160, 1)",
        fontSize: 12,
        lineHeight: 15,
    },
    userTxt:{
        marginLeft: 2
    },
    timeTxt:{
        marginLeft: 1
    },
    userTimeBox:{
        flexDirection: "row",
        alignItems: "flex-end",
    },
});

export default styles;