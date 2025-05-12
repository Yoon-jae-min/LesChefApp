//기타
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IngreType } from "../../../types/recipeTypes";

//컴포넌트
import IngreUnit from "./ingreUnit";

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

const styles = StyleSheet.create({
    container:{

    },
    title:{

    }
});

export default IngreBox;