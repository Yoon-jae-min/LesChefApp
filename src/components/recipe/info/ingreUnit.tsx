//기타
import React from "react";
import { Text, View } from "react-native";

//Type
import { IngreType } from "../../../types/recipeTypes";

//style
import styles from "@styles/recipe/info/ingreUnit.style";

type Props = {
    ingre: IngreType;
}

function IngreUnit(props: Props): React.JSX.Element{
    const {ingre} = props;

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{ingre.sortName}</Text>
            {ingre.units.map((item, index) => (
                <View key={index}>
                    <Text>{item.name}</Text>
                    <View>
                        <Text>{item.amount}</Text>
                        <Text>{item.unit}</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default IngreUnit;