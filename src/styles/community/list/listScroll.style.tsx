import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "93%",
        margin: "auto",
    },
    element:{
        width: "100%",
        height: 70,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 3,
        marginBottom: 3,
        justifyContent: "space-between"
    },
    topBox:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title:{
        width: "80%",
        marginLeft: 7,
        marginTop: 5,
        fontSize: 16
    },
    viewCount:{
        height: 22,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 7,
        marginTop: 5
    },
    vcImg:{
        height: 18,
        width: 18,
        resizeMode: "contain",
        marginRight: 3
    },
    vcText:{
        color: "rgb(204, 204, 204)",
        height: 20
    },
    bottomBox:{
        marginBottom: 2,
        height: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    noticeBtm:{
        justifyContent: "flex-end"
    },
    boardBtm:{
        justifyContent: "space-between",
    },
    leftInfo:{
        height: 20,
        flexDirection: "row",
        marginLeft: 7,
        alignItems: "center",
    },
    rightInfo:{
        height: 20,
        marginRight: 7,
        justifyContent: "flex-end",
    },
    profileImg:{
        width: 14,
        height: 14,
        marginRight: 5,
        borderWidth: 0.5,
        borderColor: "rgba(204, 204, 204, 1)",
        borderRadius: 50
    },
    userId:{
        fontSize: 14,
        color: "rgba(67, 67, 67, 1)"
    },
    time:{
        height: 15,
        fontSize: 10,
        color: "rgb(160, 160, 160)"
    }
});

export default styles;