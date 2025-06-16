//기타
import React from "react";
import { TextInput, View } from "react-native";

//style
import styles from "@styles/common/useElement/searchBar/mainSearch.style";

function MainSearch(): React.JSX.Element{
    return(
        <View style={styles.contaniner}>
            <TextInput style={styles.searchBox} placeholder="입력하세요..."/>
        </View>
    )
}

export default MainSearch;