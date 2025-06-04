import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "auto"
    },
    eachBox:{
        flexDirection: "row",
        width: 150,
        justifyContent: "space-between",
    },
    each:{
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "rgba(160, 160, 160, 1)",
        width: "47%",
        borderRadius: 3,
        fontFamily: "SourceSerif4-Bold"
    },
    eachText:{
        height: 24,
        fontSize: 15,
        padding: 0,
        margin: 0,
        textAlign: "center",
    },
    dropBox:{
        width: "47%",
    },
    dropClose:{
        borderColor: "rgba(160, 160, 160, 1)",
        borderRadius: 3,
        minHeight: 28,
        flex: 1,
    },
    dropOpen:{
        borderColor: "rgba(160, 160, 160, 1)",
        borderRadius: 3,
    }
});

export default styles;