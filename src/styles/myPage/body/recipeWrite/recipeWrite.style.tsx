import { StyleSheet } from "react-native";

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
        borderRadius: 5
    }
});

export default styles;