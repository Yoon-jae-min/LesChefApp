import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        marginTop: 6,
        width: "98%",
        marginLeft: "2%",
        flexDirection: "row",
        
    },
    btnBox:{
        width: 25,
    },
    btnImg:{
        height: 25,
        width: 25
    },
    elementBox:{
        marginLeft: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    inputBox:{
        height: 25,
        borderWidth:1,
        borderRadius: 3,
        borderColor: "rgb(160, 160, 160)"
    },
    input:{
        lineHeight: 25,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 0,
        paddingBottom: 0,
        textAlign: "center"
    },
    nameInput:{
        minWidth: 75,
        maxWidth: 100,
    },
    rightBox:{
        height: 25,
        flexDirection: "row",
    },
    amountBox:{
        marginRight: 10,
    },
    amountInput:{
        width: 60
    },
    unitInput:{
        width: 60
    }
});

export default styles