import { StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing } from "../../common/theme";

const styles = StyleSheet.create({
    list:{
        flex: 1,
        width: "95%"
    },
    listAlign:{
        flexWrap: "wrap",
        flexDirection: "row",
        paddingVertical: spacing.sm,
    },
    element:{
        width: "44%",
        marginTop: spacing.md,
        marginBottom: spacing.md,
        marginLeft: "3%",
        marginRight: "3%",
        borderRadius: borderRadius.lg, // 웹의 rounded-2xl
        borderWidth: 1,
        borderColor: colors.gray[200], // 웹의 border-gray-200
        backgroundColor: colors.white,
        flexDirection: "column",
        alignItems: "center",
        ...shadows.card, // 웹의 그림자 효과
        paddingBottom: spacing.sm,
    },
    foodImgBox: {
        borderColor: colors.gray[200],
        borderWidth: 1,
        borderRadius: borderRadius.md,
        marginTop: spacing.md,
        marginBottom: spacing.sm,
        width: "86%",
        aspectRatio: 1 / 1,
        backgroundColor: colors.gray[50],
        ...shadows.default,
    },
    foodImg:{
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        aspectRatio: 1 / 1,
        borderRadius: borderRadius.md,
    },
    elementTxt:{
        fontWeight: "600",
    },
    foodName:{
        fontSize: 14,
        color: colors.black,
        fontWeight: "600",
        marginTop: spacing.xs,
    },
    subInfo:{
        width: "90%",
        height: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: spacing.xs,
        marginBottom: spacing.xs,
    },
    subInfoImg:{
        width: 13,
        height: 13,
        resizeMode: "contain",
    },
    subInfoTxt:{
        height: 15,
        color: colors.gray[500], // 웹의 text-gray-500
        fontSize: 12,
        lineHeight: 15,
    },
    userTxt:{
        marginLeft: 2
    },
    timeTxt:{
        marginLeft: 1
    },
    userTimeBox:{
        flexDirection: "row",
        alignItems: "flex-end",
    },
});

export default styles;