import { StyleSheet } from "react-native";
import { colors } from "../../common/theme";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.gradient.orange, // 웹의 그라데이션 배경
    }
});

export default styles;