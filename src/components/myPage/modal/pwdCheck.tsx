//기타
import React, { useRef } from "react";
import { Alert, Image, Pressable, TextInput, View } from "react-native";

//style
import styles from "@styles/myPage/modal/pwdCheck.style";

type Props = {
    setModalType: React.Dispatch<React.SetStateAction<{
        isPwdCheck: boolean,
        isShow: boolean,
        isInfoChg: boolean,
        isPwdChg: boolean,
    }>>
}

function PwdCheck(props: Props): React.JSX.Element{
    const {setModalType} = props;
    const inputData = useRef("");

    const pwdCheck = () => {
        if(inputData.current === "1234"){
            setModalType((prev) => {return {...prev, isPwdCheck: false}})
        }
        else{
            Alert.alert("패스워드 틀림");
        }
    }

    return(
        <View style={styles.container}>
            <TextInput 
                style={styles.pwdInput} 
                secureTextEntry={true} 
                placeholder="Password"
                onChangeText={(text) => inputData.current = text}/>
            <Pressable style={styles.okBtn} onPress={() => pwdCheck()}>
                <Image style={styles.okBtnImg} source={require("../../../assets/image/ok_BK.png")}/>
            </Pressable>
        </View>
    )
}

export default PwdCheck;