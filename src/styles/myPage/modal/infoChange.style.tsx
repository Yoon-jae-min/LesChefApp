import { StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing, cardStyle } from "../../../common/theme";

const styles = StyleSheet.create({
    container:{
        width: 300,
        minHeight: 320,
        ...cardStyle, // 웹 스타일의 카드 디자인
        alignItems: "center",
        justifyContent: "flex-end",
    },
    infoLineBox:{
        width: 290,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    infoLabel:{
        fontWeight: "600",
        width: 70,
        textAlign: "center",
        fontSize: 18,
        color: colors.black,
    },
    infoInput:{
        borderWidth: 1,
        borderRadius: borderRadius.sm,
        borderColor: colors.gray[300],
        width: 210,
        textAlign: "center",
        fontSize: 15,
        color: colors.black,
        backgroundColor: colors.white,
    },
    okImg:{
        width: 50,
        height: 50,
        marginTop: spacing.sm,
        marginBottom: spacing.md,
    }
});

export default styles;