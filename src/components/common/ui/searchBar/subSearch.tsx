//기타
import React from "react";
import { TextInput, View } from "react-native";

//style
import styles from "./subSearch.style";

function SubSearch(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <TextInput style={styles.searchInput} placeholder="검색"/>
        </View>
    )
}

export default SubSearch;