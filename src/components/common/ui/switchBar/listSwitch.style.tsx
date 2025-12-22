import { StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing } from "../../../../styles/common/theme";

export const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "97%",
        backgroundColor: colors.white,
        marginTop: spacing.md,
        borderRadius: borderRadius.md,
        ...shadows.default,
        padding: spacing.sm,
    },
    arrow:{
        width: 40,
        height: 40,
    }
});

export const pickerStyles = StyleSheet.create({
    inputIOS: {
        fontWeight: "600",
        fontSize: 18,
        padding: 12,
        width: 250,
        height: 50,
        backgroundColor: colors.white,
        color: colors.black,
        textAlign: "center",
        borderRadius: borderRadius.sm,
        borderWidth: 1,
        borderColor: colors.gray[300],
    },
    inputAndroid: {
        fontWeight: "600",
        fontSize: 18,
        padding: 12,
        width: 250,
        height: 50,
        backgroundColor: colors.white,
        color: colors.black,
        textAlign: "center",
        borderRadius: borderRadius.sm,
        borderWidth: 1,
        borderColor: colors.gray[300],
    },
})

