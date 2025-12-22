import { Dimensions, StyleSheet } from "react-native";

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        width: width * 0.95,
        alignItems: "center",
    },
    profileImg:{
        marginTop: 50,
        width: (width * 0.8),
        height: (width * 0.8),
        borderWidth: 1,
        borderColor: "rgb(190, 190, 190)",
        borderRadius: (width * 0.8) / 2,
    },
    textCommon:{
        fontFamily: "Jua-Regular",
    },
    nickNameBox:{
        marginTop: 15
    },
    nickNameText:{
        fontSize: 40,
        color: "rgb(105, 103, 103)"
    },
    idBox:{

    },
    idText:{
        fontSize: 15,
        color: "rgb(173, 172, 172)"
    }
});

export default styles;