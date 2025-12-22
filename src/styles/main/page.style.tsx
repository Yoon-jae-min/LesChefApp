import { StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing } from "../common/theme";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.gradient.orange, // 웹의 그라데이션 배경
    },
    containerAlign:{
        alignItems: "center",
        paddingVertical: spacing.md,
    },
    searchBox:{
        width: "90%",
        height: 44,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: spacing.sm,
        marginBottom: spacing.md,
        textAlign: "center",
        borderColor: colors.gray[300],
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: borderRadius.md,
        color: colors.gray[500],
        ...shadows.default,
    }
});

export default styles;