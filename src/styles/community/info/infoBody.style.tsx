import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
    },
    scrollAlign:{
        alignItems: "center",
        paddingBottom: 40,
    },
    top:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    topBoard: {
        marginTop: 15,
        marginBottom: 10,
        alignItems: "flex-end",
        width: "93%",
    },
    topNotice: {
        width: "91%",
    },
    profileBox:{
        flexDirection: "row",
    },
    profileImg:{
        borderWidth: 1,
        borderColor: "rgba(204, 204, 204, 1)",
        borderRadius: 50,
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    profileTxt:{
        marginLeft: 10,
    },
    userId:{

    },
    writeTime:{
        color: "rgb(160, 160, 160)"
    },
    viewBox:{
        marginBottom: 7,
        marginRight: 5
    },
    viewTxt:{
        color: "rgb(160, 160, 160)"
    },
    body:{
        width: "93%",
        minHeight: "50%",
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "rgba(204, 204, 204, 1)",
        padding: 10
    },
    content:{
        width: "100%"
    }
});

export default styles;