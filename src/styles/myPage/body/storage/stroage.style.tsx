import { StyleSheet } from "react-native";
import { colors, spacing } from "../../../common/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gradient.orange, // 웹의 그라데이션 배경
        alignItems: "center",
    },
    scroll: {
        width: "93%",
        flex: 1,
        marginTop: spacing.sm
    }
});

export default styles;