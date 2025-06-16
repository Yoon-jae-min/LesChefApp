import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        width: "93%",
        alignItems: "center",
    },
    title:{
        borderBottomWidth: 1,
        borderBottomColor: "rgb(160, 160, 160)",
        fontFamily: "Kavoon-Regular",
        fontSize: 20,
        textAlign: "center",
        width: 100,
        height: 33,
    },
    input:{
        margin: 10,
        borderWidth: 1,
        borderColor: "rgb(160, 160, 160)",
        width: screenWidth * 0.93,
        height: 70,
        textAlignVertical: "top",
        padding: 5,
    },
    comment:{
        backgroundColor: "rgb(237, 237, 237)",
        width: screenWidth * 0.93,
        borderRadius: 5,
        padding: 7,
        marginBottom: 5
    },
    commentTop:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",

    },
    profileBox:{
        flexDirection: "row",
        alignItems: "center"
    },
    profileImg:{
        borderWidth: 1,
        borderColor: "rgba(204, 204, 204, 1)",
        borderRadius: 50,
        width: 25,
        height: 25,
        resizeMode: "contain",
        marginRight: 5
    },
    userId:{
        marginRight: 5
    },
    time:{
        color: "rgb(130, 130, 130)"
    },
    deleteBtn:{
        width: 25,
        height: 25,
        resizeMode: "contain"
    },
    content:{
        margin: 7
    }
});

export default styles;