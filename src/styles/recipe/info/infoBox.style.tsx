import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
        paddingBottom: 20,
    },
    scrollAlign:{
        alignItems: "center",
    },
    topInfoBox:{
        flexDirection: "row",
        width: "90%",
        height: 25,
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    leftInfo:{
    },
    category:{
        color: "rgb(170, 170, 170)",
    },
    rightInfo:{
        flexDirection: "row",
        alignItems: "center",
    },
    portion:{
        height: 20,
        lineHeight: 20,
        color: "rgb(170, 170, 170)",
    },
    line:{
        marginLeft: 5,
        marginRight: 3,
        borderWidth: 0.5,
        height: 20,
        borderColor: "rgb(170, 170, 170)",
    },
    timeBox:{
        flexDirection: "row",
    },
    timeImg:{
        height: 20,
        width: 20,
        resizeMode: "contain",
    },
    timeText:{
        color: "rgb(170, 170, 170)",
    },
    mainImg:{
        borderRadius: 5,
        borderColor: "rgb(120, 120, 120)",
        borderWidth: 1,
        marginTop: 3,
        width: screenWidth * 0.93,
        height: screenWidth * 0.93
    }
});

export default styles;