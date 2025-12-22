import { StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing, cardStyle } from "../../../common/theme";

const styles = StyleSheet.create({
    container:{
        width: 330,
        minHeight: 190,
        ...cardStyle, // 웹 스타일의 카드 디자인
        alignItems: "center",
        justifyContent: "center"
    },
    pwdLineBox:{
        width: 290,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    pwdLabel:{
        fontWeight: "600",
        width: 100,
        textAlign: "center",
        fontSize: 18,
        color: colors.black,
    },
    pwdInput:{
        marginLeft: spacing.xs,
        borderWidth: 1,
        borderRadius: borderRadius.sm,
        borderColor: colors.gray[300],
        width: 200,
        textAlign: "center",
        fontSize: 15,
        color: colors.black,
        backgroundColor: colors.white,
    },
    okImg:{
        width: 50,
        height: 50,
    }
});

export default styles;