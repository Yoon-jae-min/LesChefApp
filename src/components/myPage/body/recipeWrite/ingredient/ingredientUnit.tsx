//기타
import React from "react";
import { Image, Pressable, TextInput, View } from "react-native";

//style
import styles from "@styles/myPage/body/recipeWrite/ingredient/ingredientUnit.style";

//Commponent
import IngredientEach from "./ingredientEach";

//type
import { IngreType } from "../../../../../types/recipeTypes";

type Props = {
    ingreUnit: IngreType;
    unitIndex: number;
    addElement: (type: string, index: number) => void;
    removeElement: (type: string, unitIndex: number, eachIndex: number) => void;
    inputElement: (inputValue: IngreType, unitIndex: number) => void;
}

function IngredientUnit(props: Props): React.JSX.Element{
    const {ingreUnit, unitIndex, addElement, removeElement, inputElement} = props;

    return(
        <View style={styles.container}>
            <View style={styles.nameBox}>
                <View style={styles.nameLeft}>
                    <TextInput 
                        value={ingreUnit.sortName}
                        style={styles.name} 
                        placeholder="Sort" 
                        onChangeText={(text) => 
                            inputElement({sortName: text, units: ingreUnit.units}, unitIndex)}/>
                    <Pressable onPress={() => addElement("each", unitIndex)}>
                        <Image style={styles.btn} source={require("../../../../../assets/image/addUnit.png")}/>
                    </Pressable>
                </View>
                <View style={styles.nameRight}>
                    <Pressable onPress={() => removeElement("unit", unitIndex, 0)}>
                        <Image style={styles.btn} source={require("../../../../../assets/image/remove.png")}/>
                    </Pressable>
                </View>
            </View>
            {ingreUnit.units.map((item, index) => (
                <IngredientEach 
                    key={index} 
                    unitIndex={unitIndex}
                    eachIndex={index} 
                    ingreUnit={ingreUnit}
                    ingreEach={item} 
                    removeElement={removeElement}
                    inputElement={inputElement}/>
            ))}
        </View>
    )
}

export default IngredientUnit;