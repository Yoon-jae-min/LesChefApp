import { StyleSheet } from "react-native";
import { colors } from "./theme";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: "relative",
        backgroundColor: colors.gradient.orange, // 웹의 그라데이션 배경
    },
    body:{
        flex: 1,
        backgroundColor: colors.gradient.orange,
    },
    menuBackground:{
        zIndex: 5,
        position: "absolute",
        top: 70,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0)",
    }
});

export default styles;