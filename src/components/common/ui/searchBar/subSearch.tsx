//기타
import React from "react";
import { Image, TextInput, View } from "react-native";
import { Images } from "../../../../assets/images";

//style
import styles from "./subSearch.style";

function SubSearch(): React.JSX.Element{
    return(
        <View style={styles.container}>
            <TextInput style={styles.searchInput}/>
            <Image style={styles.searchImg} source={Images.search}/>
        </View>
    )
}

export default SubSearch;