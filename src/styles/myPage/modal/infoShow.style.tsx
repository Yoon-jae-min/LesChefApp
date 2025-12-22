import { StyleSheet } from "react-native";
import { colors, borderRadius, shadows, spacing, cardStyle } from "../../../common/theme";

const styles = StyleSheet.create({
    container:{
        width: 300,
        minHeight: 260,
        ...cardStyle, // 웹 스타일의 카드 디자인
        alignItems: "center",
        justifyContent: "center",
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
    infoValue:{
        fontWeight: "400",
        width: 210,
        textAlign: "center",
        fontSize: 15,
        color: colors.gray[600]
    }
});

export default styles;