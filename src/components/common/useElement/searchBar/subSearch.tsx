//기타
import React from "react";
import { Image, TextInput, View } from "react-native";

//style
import styles from "@styles/common/useElement/searchBar/subSearch.style";

function SubSearch(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <TextInput style={styles.searchInput}/>
            <Image style={styles.searchImg} source={require("../../../../assets/image/search.png")}/>
        </View>
    )
}

export default SubSearch;