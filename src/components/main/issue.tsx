//기타
import React from "react";
import { Text, View } from "react-native";

//style
import styles from "@styles/main/issue.style";

function Issue(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Issue</Text>
            <Text style={styles.example}>{`공지사항 또는\n요리나 음식 관련 뉴스 정보\n표시 예정 구역`}</Text>
        </View>
    )
}

export default Issue;