import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width: "88%",
        height: 35,
        borderRadius: 50,
        backgroundColor: "rgb(236, 236, 236)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    searchInput:{
        width: "83%",
        marginLeft: 10
    },
    searchImg:{
        width: 30,
        height: 30,
        marginRight: 10
    }
});

export default styles;