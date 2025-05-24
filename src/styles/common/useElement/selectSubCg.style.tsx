import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width: "93%",
        height: 25,
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 10,
    },
    element:{
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginRight: 5,
        borderWidth: 1,
        borderColor: "rgba(67, 67, 67, 1)"
    },
    selectE:{
        backgroundColor: "rgba(67, 67, 67, 1)",
    },
    nonSelectE:{
        backgroundColor: "rgba(255, 255, 255, 1)",
    },
    txt:{
        fontFamily: "Jua-Regular",
    },
    selectT:{
        color: "rgba(255, 255, 255, 1)"
    },
    nonSelectT:{
        color: "rgba(0, 0, 0, 1)"
    }
})

export default styles;