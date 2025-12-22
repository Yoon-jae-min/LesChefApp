import { StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing, cardStyle } from "../common/theme";

const styles = StyleSheet.create({
    container:{
        width: "93%",
        marginTop: spacing.sm,
        ...cardStyle, // 웹 스타일의 카드 디자인
        marginBottom: spacing.md,
    },
    title:{
        fontSize: 24,
        fontWeight: "bold",
        color: colors.black,
        marginBottom: spacing.sm,
    },
    example:{
        textAlign: "center",
        textAlignVertical: "center",
        minHeight: 120,
        color: colors.gray[600],
        fontSize: 14,
        lineHeight: 20,
    }
});

export default styles;