import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        aspectRatio: 1.2 / 1,
        height: 15,
        marginRight: 20,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    line: {
        width: "100%",
        height: 0,
        borderColor: "#000",
        borderWidth: 0.8,
    }
});

export default styles;