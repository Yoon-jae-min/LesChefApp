import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width: "90%",
        height: 44,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: 5,
        marginBottom: 12,
        borderColor: "rgba(81, 81, 81, 1)",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    element:{
        width: "25%",
        height: "75%",
        justifyContent: "center",
        alignItems: "center",
    },
    sepaator:{
        width: 1,
        height: "75%",
        backgroundColor: "rgba(160, 160, 160, 1)",
    },
    selected:{
        fontFamily: "SourceSerif4-Bold"
    },
    nonSelected:{
        color: "rgba(160, 160, 160, 1)",
        fontFamily: "SourceSerif4-Light"
    }
});

export default styles;