import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width: "98%",
        margin: "auto",
        marginTop: 20,
        alignItems: "center",
    },
    title:{
        fontFamily: "Kavoon-Regular",
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgb(160, 160, 160)",
        width: 110,
        textAlign: "center",
    },
    addBtnBox:{
        marginTop: 10,
        width: "100%",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "rgb(160, 160, 160)",
        alignItems: "center",
    },
    addBtn:{
        height: 30,
        aspectRatio: "1 / 1"
    },
});

export default styles;