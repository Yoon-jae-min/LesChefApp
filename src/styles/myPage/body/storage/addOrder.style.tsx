import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width: "93%",
        height: 40,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
    orderBox:{
        flexDirection: "row",
        marginBottom: 3,
    },
    orderText:{
        marginLeft: 10,
        fontFamily: "Jua-Regular",
        fontSize: 20,
        color: "rgb(100, 100, 100)"
    },
    addBtnBox:{
        width: 90,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "rgb(123, 123, 123)",
        alignItems: "center",
        justifyContent: "center",
    },
    addBtnImg:{
        height: 30,
        width: 30,
    }
});

export default styles