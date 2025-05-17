import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    body:{
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    logoBox: {
        width: "35%",
        height: "100%",
    },
    logo:{
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    }
});

export default styles;