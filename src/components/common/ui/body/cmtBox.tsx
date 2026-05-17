//기타
import React from "react";
import { Text, TextInput, View } from "react-native";

//Type
import { CommentType } from "../../../../types/recipeTypes";

//style
import styles from "./cmtBox.style";

type Prop = {
    comments: CommentType[]
}

function CommentBox(props: Prop): React.JSX.Element{
    const {comments} = props;

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Comment</Text>
            <TextInput multiline={true} style={styles.input} placeholder="댓글을 입력해주세요"/>
            {comments.map((item, index) => (
                <View key={index} style={styles.comment}>
                    <View style={styles.commentTop}>
                        <View style={styles.profileBox}>
                            <Text style={styles.userId}>{item.userId}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                        <Text style={styles.deleteBtn}>삭제</Text>
                    </View>
                    <Text style={styles.content}>{item.content}</Text>
                </View>
            ))}
        </View>
    )
}

export default CommentBox;