import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
    },
    arrow:{
        width: 40,
        height: 40,
    }
});

export const pickerStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: "Jua-Regular",
        fontSize: 22,
        padding: 12,
        width: 250,
        height: 50,
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
    },
    inputAndroid: {
        fontFamily: "Jua-Regular",
        fontSize: 22,
        padding: 12,
        width: 250,
        height: 50,
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
    },
})

