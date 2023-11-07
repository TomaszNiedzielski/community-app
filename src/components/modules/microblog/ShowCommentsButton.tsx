import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PostProps, setAllComments } from '../../../redux/posts';
import { RootState } from '../../../redux/store';
import api from '../../../utils/api';

interface Props {
    commentsCount: number;
    postId: PostProps['id'];
}

const ShowCommentsButton: React.FC<Props> = ({ commentsCount, postId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.user);

    const showComments = () => {
        setIsLoading(true);

        api.get(`/posts/${postId}/comments`, token)
        .then((res: any) => {
            dispatch(setAllComments({ postId, comments: {
                count: res.data.length,
                items: res.data
            }}))
        })
        .finally(() => setIsLoading(false));
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={showComments}
            hitSlop={styles.hitSlop}
        >
            <Text style={styles.title}>
                {!isLoading
                    ? `SHOW COMMENTS (${commentsCount - 2})`
                    : <ActivityIndicator /* color={Colors.gray} */ size={16} />}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        alignSelf: 'center',
        padding: 3,
        borderRadius: 4,
        marginTop: 10,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 12,
        width: 130,
        textAlign: 'center',
    },
    hitSlop: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    }
});

export default ShowCommentsButton;
