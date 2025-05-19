import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: "white"
    },
    iconBox:{
        flexDirection: "row",
        width: "90%",
        height: 30,
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: 10,
        marginBottom: 3,
    },
    alignBox:{
        flexDirection: "row",
        height: 25,
        width: 85,
        justifyContent: "space-between"
    },
    icon:{
        width: 25,
        height: 25,
        resizeMode: "contain",
    },
    textInput:{
        borderWidth: 1,
        width: "93%",
        flex: 1,
        marginBottom: 7,
        borderRadius: 5,
    }
});

export default styles;