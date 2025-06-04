//기타
import React from "react";
import { Image, Pressable, TextInput, View } from "react-native";

//style
import styles from "@styles/myPage/body/recipeWrite/ingredient/ingredientEach.style";

//type
import { IngreType, UnitType } from "../../../../../types/recipeTypes";

type Props = {
    unitIndex: number;
    eachIndex: number;
    ingreUnit: IngreType;
    ingreEach: UnitType;
    removeElement: (type: string, unitIndex: number, eachIndex: number) => void;
    inputElement: (inputValue: IngreType, unitIndex: number) => void;
}

function IngredientEach(props: Props): React.JSX.Element{
    const {unitIndex, eachIndex, ingreUnit, ingreEach, removeElement, inputElement} = props;

    const ingreAssemble = (eachIndex: number, value: UnitType) => {
        const returnUnit = {
            sortName: ingreUnit.sortName,
            units: ingreUnit.units.map((item, index) => 
                index === eachIndex ? value : item
            )
        }
        return returnUnit;
    }

    return(
        <View style={styles.container}>
            <View style={styles.btnBox}>
                <Pressable onPress={() => removeElement("each", unitIndex, eachIndex)}>
                    <Image style={styles.btnImg} source={require("../../../../../assets/image/remove.png")}/>
                </Pressable>
            </View>
            <View style={styles.elementBox}>
                <View style={styles.inputBox}>
                    <TextInput 
                        value={ingreEach.name}
                        style={[styles.nameInput, styles.input]} 
                        placeholder="재료"
                        onChangeText={(text) => 
                            inputElement( 
                                ingreAssemble(
                                    eachIndex, 
                                    {name: text, amount: ingreEach.amount, unit: ingreEach.unit}),
                                unitIndex)}/>
                </View>
                <View style={styles.rightBox}>
                    <View style={[styles.inputBox, styles.amountBox]}>
                        <TextInput 
                            value={ingreEach.amount.toString()}
                            keyboardType="numeric" 
                            style={[styles.amountInput, styles.input]} 
                            placeholder="양"
                            onChangeText={(text) => 
                                inputElement( 
                                    ingreAssemble(
                                        eachIndex, 
                                        {name: ingreEach.name, amount: parseInt(text), unit: ingreEach.unit}),
                                    unitIndex)}/>
                    </View>
                    <View style={styles.inputBox}>
                        <TextInput 
                            value={ingreEach.unit}
                            style={[styles.unitInput, styles.input]} 
                            placeholder="단위"
                            onChangeText={(text) => 
                                inputElement( 
                                    ingreAssemble(
                                        eachIndex, 
                                        {name: ingreEach.name, amount: ingreEach.amount, unit: text}),
                                    unitIndex)}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default IngredientEach;