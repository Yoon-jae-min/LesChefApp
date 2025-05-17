import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "93%",
        alignItems: "center",
        marginTop: 7,
    },
    iconBox:{
        flexDirection: "row",
        width: "97%",
        height: 30,
        justifyContent: "space-between",
        alignItems: "flex-end",
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
        width: "100%",
        flex: 1,
        marginBottom: 7,
        borderRadius: 5,
    }
});

export default styles;