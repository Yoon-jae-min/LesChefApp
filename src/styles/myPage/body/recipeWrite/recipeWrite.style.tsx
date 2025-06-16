import { Dimensions, StyleSheet } from "react-native";

const {height, width} = Dimensions.get("window");

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    scroll:{
        width: "93%",
        marginTop: 15,
    },
    imgInputBox:{
        borderWidth: 1,
        width: "100%",
        aspectRatio: "1 / 1",
        marginTop: 5,
        borderColor: "rgba(160, 160, 160, 1)",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    imgAddBtn:{
        width: 70,
        height: 70,
    },
    img:{
        borderRadius: 5,
        width: "100%",
        height: "100%",
    }
});

export default styles;