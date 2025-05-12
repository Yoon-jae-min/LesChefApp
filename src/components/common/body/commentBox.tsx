//기타
import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { CommentType } from "../../../types/recipeTypes";

type Prop = {
    comments: CommentType[]
}

function CommentBox(props: Prop): React.JSX.Element{
    const {comments} = props;

    return(
        <View style={styles.container}>
            <Text>Comment</Text>
            <TextInput placeholder="댓글을 입력해주세요"/>
            {comments.map((item, index) => (
                <View key={index}>
                    <View>
                        <View>
                            <Image source={require("../../../assets/image/profile.png")}/>
                            <Text>{item.userId}</Text>
                            <Text>{item.time}</Text>
                        </View>
                        <Image source={require("../../../assets/image/delete.png")}/>
                    </View>
                    <Text>{item.content}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    }
})

export default CommentBox;