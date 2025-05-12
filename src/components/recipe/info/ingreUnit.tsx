//기타
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IngreType } from "../../../types/recipeTypes";

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

const styles = StyleSheet.create({
    container:{

    },
    title:{

    }
});

export default IngreUnit;