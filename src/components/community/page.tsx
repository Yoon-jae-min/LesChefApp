//기타
import React from "react";
import { View } from "react-native";

//Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Component
import ListBody from "./list/listBody";
import InfoBody from "./info/infoBody";
import WriteBody from "./write/writeBody";

//style
import styles from "@styles/community/page.style";

const CommunityStack = createNativeStackNavigator();

function PageCommunity(): React.JSX.Element{

    return(
        <View style={styles.container}>
            <CommunityStack.Navigator screenOptions={{headerShown: false}}>
                <CommunityStack.Screen name="List" component={ListBody}/>
                <CommunityStack.Screen name="Info" component={InfoBody}/>
                <CommunityStack.Screen name="Write" component={WriteBody}/>
            </CommunityStack.Navigator>
        </View>
    )
}

export default PageCommunity;