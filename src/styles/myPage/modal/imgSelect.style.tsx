import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container:{
        marginTop: (height - 250)/2,
        marginBottom: (height - 250)/2,
        width: 61,
        height: 250,
        position: "absolute",
        left: 0,
        borderEndEndRadius: 5,
        borderEndStartRadius: 5,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    boxCommon:{
        borderRadius: "50%",
        paddingTop: 8,
        paddingBottom: 8,
        width: 70,
        height: 70,
        backgroundColor: "rgb(240, 233, 233)",
        alignItems: "center"
    },
    btnImg:{
        width: 34,
        height: 34,
    },
    btnText:{
        height: 20,
    },
    cameraBtnBox:{
        
    },
    galleryBtnBox:{
    },
    cancelBtnBox:{
    }
});

export default styles;