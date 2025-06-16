import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
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
    head: {
        width: "100%",
        height: 25,
        flexDirection: "row",
        marginTop: 5,
    },
    element:{
        width: 70,
        marginLeft: "4%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "rgba(67, 67, 67, 1)"
    },
    txt:{
        fontFamily: "Jua-Regular",
    }
});

export default styles;