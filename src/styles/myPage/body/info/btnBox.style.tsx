import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        width: "95%",
        alignItems: "center",
    },
    btnCommon:{
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 5,
        width: "55%",
        height: 30,
    },
    textCommon:{
        height: 30,
        lineHeight: 30,
        textAlign: "center",
        textAlignVertical: "center",
    },
    modalBox:{
        width: width,
        height: height,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        alignItems: "center",
        justifyContent: "center",
    },
    closeBtn: {
        position: "absolute",
        right: 10,
        top: 10,
        width: 40,
        height: 40,
    },
    closeBtnImg:{
        width: 40,
        height: 40,
    }
});

export default styles;