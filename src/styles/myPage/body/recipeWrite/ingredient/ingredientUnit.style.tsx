import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width: "100%",
        marginTop: 9
    },
    nameBox:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    nameLeft:{
        flexDirection: "row",
        alignItems: "center",
    },
    nameRight:{

    },
    name:{
        borderWidth: 1,
        borderColor: "rgb(160, 160, 160)",
        borderRadius: 5,
        minWidth: 90,
        maxWidth: 180,
        lineHeight: 35,
        height: 35,
        marginRight: 4,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        paddingBottom: 0,
        textAlign: "center",
        fontFamily: "SourceSerif4-Bold"
    },
    btn:{
        width: 30,
        height: 30,
        aspectRatio: "1/1"
    },
    contentBox:{
        
    }
});

export default styles;