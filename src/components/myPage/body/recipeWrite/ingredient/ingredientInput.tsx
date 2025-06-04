//기타
import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

//style
import styles from "@styles/myPage/body/recipeWrite/ingredient/ingredientInput.style";

//Commponent
import IngredientUnit from "./ingredientUnit";

//type
import { IngreType } from "../../../../../types/recipeTypes";

function IngredientInput(): React.JSX.Element{
    const [ingreUnits, setIngreUnits] = useState<IngreType[]>([]);

    const addElement = (type: string, unitIndex: number) => {
        switch (type){
            case "unit":
                setIngreUnits((prev) => [
                    ...prev,
                    {
                        sortName: "",
                        units: []
                    }
                ]);
                break;
            case "each":
                setIngreUnits((prev) => 
                    (prev.map((item, index) => (
                        index === unitIndex ? 
                            { 
                                sortName: item.sortName, 
                                units: [
                                    ...item.units,
                                    {
                                        name: "",
                                        amount: 0,
                                        unit: ""
                                    }] 
                            } : item
                    )))
                );
                break;
            default:
                break;
        }
    }

    const removeElement = (type: string, unitIndex: number, eachIndex: number) => {
        switch (type){
            case "unit":
                setIngreUnits((prev) => 
                    prev.filter((_, index) => index !== unitIndex));
                break;
            case "each":
                setIngreUnits((prev) => 
                    prev.map((item, index) => 
                        index === unitIndex ? 
                            {
                                sortName: item.sortName,
                                units: item.units.filter((item, index) => index !== eachIndex)
                            }: item));
                break;
            default:
                break;
        }
    }

    const inputElement = (inputValue: IngreType, unitIndex: number) => {
        setIngreUnits((prev) => prev.map((item, index) => index === unitIndex ? inputValue : item));
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Ingredient</Text>
            {ingreUnits.map((item, index) => (
                <IngredientUnit 
                    key={index} 
                    unitIndex={index} 
                    ingreUnit={item} 
                    addElement={addElement} 
                    removeElement={removeElement}
                    inputElement={inputElement}/>
            ))}
            <Pressable style={styles.addBtnBox} onPress={() => addElement("unit", ingreUnits.length)}>
                <Image style={styles.addBtn} source={require("../../../../../assets/image/addUnit.png")}/>
            </Pressable>
        </View>
    )
}

export default IngredientInput;