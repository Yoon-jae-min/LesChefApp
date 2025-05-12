//기타
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

//컴포넌트
import ListContainer from "./list/listContainer";
import InfoContainer from "./info/infoContainer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//컨텍스트트
import { useCommon } from "../../context/commonContext";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Stack = createNativeStackNavigator();

function PageRecipe(): React.JSX.Element{
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue)
    const [selectedRecipe, setSelectedRecipe] = useState({
        title: "",
        mainSolt: "",
        subSolt: "",
        portion: 0,
        time: 0,
        imgUrl: "",
        ingres: [{
            sortName: "",
            units:[{
                name: "",
                amount: 0,
                unit: "",
            }]
        }],
        steps: [{
            stepNum: 0,
            imgUrl: "",
            content: "",
        }],
        comments: [{
            profileImg: "",
            userId: "",
            time: "",
            content: "",
        }]
    });
    const listType = useRef(categoryValue.detail);

    return(
        <View style={styles.container}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="List">
                    {() => 
                        <ListContainer 
                            listType={listType} 
                            categoryValue={categoryValue} 
                            categoryTotal={categoryTotal} 
                            setSelectedRecipe={setSelectedRecipe}/>}
                </Stack.Screen>
                <Stack.Screen name="Info">
                    {() => 
                        <InfoContainer
                            listType={listType}
                            selectedRecipe={selectedRecipe}
                            categoryTotal={categoryTotal}
                            categoryValue={categoryValue}/>}
                </Stack.Screen>
            </Stack.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
})

export default PageRecipe;