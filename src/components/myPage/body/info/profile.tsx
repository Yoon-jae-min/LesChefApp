//기타
import React from "react";
import { Image, Text, View } from "react-native";

//style
import styles from "@styles/myPage/body/info/profile.style";

function Profile(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <Image style={styles.profileImg} source={require("../../../../assets/image/profile.png")}/>
            <View style={styles.nickNameBox}>
                <Text style={[styles.nickNameText, styles.textCommon]}>잼인</Text>
            </View>
            <View style={styles.idBox}>
                <Text style={[styles.idText, styles.textCommon]}>woasl</Text>
            </View>
        </View>
    )
}

export default Profile;