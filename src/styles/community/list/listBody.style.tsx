import { StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing } from "../../common/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: colors.gradient.orange, // 웹의 그라데이션 배경
        alignItems: "center",
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
    },
    head: {
        width: "100%",
        height: 25,
        flexDirection: "row",
        marginTop: spacing.sm,
    },
    element:{
        width: 70,
        marginLeft: "4%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: colors.gray[300],
        backgroundColor: colors.white,
        ...shadows.default,
    },
    txt:{
        fontWeight: "600",
        color: colors.black,
    }
});

export default styles;