import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "93%",
    },
    center:{
        fontFamily: "Jua-Regular",
        width: 250,
        height: 50,
        backgroundColor: "white",
        textAlign: "center",
        textAlignVertical: "center",
    },
    title:{
        color: "black",
        fontSize: 22,
        lineHeight: 22,
        padding: 12,
    },
    inputTitle:{
        borderWidth: 1,
        borderColor: "rgba(160, 160, 160, 1)",
        color: "rgba(160, 160, 160, 1)",
        borderRadius: 5,
        height: 37,
        fontSize: 15,
    },
    leftIcon:{
        height: 40,
        width: 40
    },
    rightIcon:{
        height: 35,
        width: 35
    }
});

export default styles;