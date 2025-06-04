import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "rgb(160, 160, 160)",
        width: "100%",
        marginTop: 9,
        minHeight: 120,
        flexDirection: "row"
    },
    leftBox:{
        width: 120,
    },
    imgInput:{
        borderWidth: 1,
        borderColor: "rgb(160, 160, 160)",
        borderRadius: 3,
        height: 106,
        width: 106,
        marginTop: 7,
        marginLeft: 7,
    },
    rightBox:{
        flex: 1,
        padding: 5,
    },
    numText:{
        fontFamily: "SourceSerif4-Bold",
        fontSize: 15,
    },
    contentInput:{
        borderWidth: 1,
        borderColor: "rgb(160, 160, 160)",
        borderRadius: 3,
        flex: 1,
        marginTop: 5,
        marginRight: 3,
        textAlignVertical: "top",
    }
});

export default styles;