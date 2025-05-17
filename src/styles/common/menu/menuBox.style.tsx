import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        top: 70,
        width: 250,
        backgroundColor: "#E6D9D9D9",
        zIndex: 10,
        flex: 1,
        height: height - 70
    },
    profileBox: {
        height: 80,
        flexDirection: "row",
    },
    profileImg:{
        width: 50,
        aspectRatio: 1/1,
        resizeMode: "contain",
        marginTop: 15,
        marginLeft: 15,
    },
    profileTextBox:{
        width: 160,
        height: 50,
        marginTop: 15,
        marginLeft: 10,
        justifyContent: "center",
    },
    profileText:{
        fontFamily: "Jua-Regular",
        fontSize: 20, 
        lineHeight: 17
    },
    categoryBox:{
        height: height - 150
    }
});

export default styles;