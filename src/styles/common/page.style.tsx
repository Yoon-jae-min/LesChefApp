import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: "relative",
        backgroundColor: "white",
    },
    body:{
        flex: 1,
        backgroundColor: "white",
    },
    searchBox:{
        width: "90%",
        height: 44,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: 5,
        marginBottom: 10,
        textAlign: "center",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        color: "rgba(160, 160, 160, 1)"
    },
    menuBackground:{
        zIndex: 5,
        position: "absolute",
        top: 70,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0)",
    }
});

export default styles;