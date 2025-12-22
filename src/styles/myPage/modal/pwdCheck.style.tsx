import { StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing, cardStyle } from "../../../common/theme";

const styles = StyleSheet.create({
    container:{
        width: 330,
        height: 70,
        ...cardStyle, // 웹 스타일의 카드 디자인
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    pwdInput:{
        marginLeft: spacing.md,
        height: 50,
        width: 250,
        borderWidth: 1,
        borderColor: colors.gray[300],
        borderRadius: borderRadius.sm,
        textAlign: "center",
        color: colors.black,
        backgroundColor: colors.white,
    },
    okBtn:{
        width: 50,
        height: 50,
        marginRight: spacing.md
    },
    okBtnImg:{
        width: 50,
        height: 50,
    }
});

export default styles;