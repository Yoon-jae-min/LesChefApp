//기타
import React from "react";
import { Text, View } from "react-native";

//Type
import { IngreType } from "../../../types/recipeTypes";

//Component
import IngreUnit from "./ingreUnit";

//style
import styles from "@styles/recipe/info/ingreBox.style";

type Props = {
    ingres: IngreType[];
}

function IngreBox(props: Props): React.JSX.Element{
    const {ingres} = props;

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Ingredient</Text>
            {ingres.map((item, index) => (
                <IngreUnit
                    key={index}
                    ingre={item}/>
            ))}
        </View>
    )
}

export default IngreBox;