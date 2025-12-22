import { StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing } from "../../../theme";

const styles = StyleSheet.create({
    contaniner:{
        width: "90%",
        height: 44,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: spacing.sm,
        borderWidth: 1,
        borderRadius: borderRadius.md,
        borderColor: colors.gray[300],
        backgroundColor: colors.white,
        ...shadows.default,
    },
    searchBox:{
        width: "100%",
        height: 44,
        textAlign: "center",
        borderColor: colors.gray[300],
        color: colors.gray[500],
    }
});

export default styles;