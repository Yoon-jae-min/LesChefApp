//기타
import React, { useState } from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";

//style
import styles from "@styles/myPage/body/info/btnBox.style";

//Component
import PwdCheck from "../../modal/pwdCheck";
import InfoShow from "../../modal/infoShow";
import InfoChange from "../../modal/infoChange";
import PwdChange from "../../modal/pwdChange";

function BtnBox(): React.JSX.Element{
    const [isModal, setIsModal] = useState(false);
    const [modalType, setModalType] = useState({
        isPwdCheck: false,
        isShow: false,
        isInfoChg: false,
        isPwdChg: false,
    });

    const modalOn = (type: string) => {
        const changeValue = type === "show" ? {isShow: true} : type === "infoChg" ? {isInfoChg: true} : {isPwdChg: true}

        setModalType((prev) => {
            return { 
                ...prev, 
                isPwdCheck: true,
                ...changeValue
            }
        });

        setIsModal(true);
    }

    const modalClose = () => {
        setIsModal(false);
        setModalType({
            isPwdCheck: false,
            isShow: false,
            isInfoChg: false,
            isPwdChg: false
        })
    }

    return(
        <View style={styles.container}>
            <Pressable style={styles.btnCommon} onPress={() => modalOn("show")}>
                <Text style={styles.textCommon}>정보 확인</Text>
            </Pressable>
            <Pressable style={styles.btnCommon} onPress={() => modalOn("infoChg")}>
                <Text style={styles.textCommon}>정보 변경</Text>
            </Pressable>
            <Pressable style={styles.btnCommon} onPress={() => modalOn("pwdChg")}>
                <Text style={styles.textCommon}>비밀번호 변경</Text>
            </Pressable>
            <Modal
                visible={isModal}
                animationType="none"
                transparent={true}
                onRequestClose={() => setIsModal(false)}>
                <Pressable style={styles.modalBox} onPress={modalClose}>
                    <Pressable 
                        onPress={modalClose} 
                        style={styles.closeBtn}>
                        <Image style={styles.closeBtnImg} source={require("../../../../assets/image/cancel_WT.png")}/>
                    </Pressable>
                    {modalType.isPwdCheck && <PwdCheck setModalType={setModalType}/>}
                    {!modalType.isPwdCheck && 
                        modalType.isShow && <InfoShow/>}
                    {!modalType.isPwdCheck && 
                        modalType.isInfoChg && <InfoChange/>}
                    {!modalType.isPwdCheck && 
                        modalType.isPwdChg && <PwdChange/>}
                </Pressable>
            </Modal>
        </View>
    )
}

export default BtnBox;