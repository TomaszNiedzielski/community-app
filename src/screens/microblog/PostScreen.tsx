import { useState, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, TextInput, View, Alert, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Post, { PostWrapper } from '../../components/modules/microblog/Post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import api from '../../utils/api';
import { PostProps, createComment, updatePost } from '../../redux/posts';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors, { Theme } from '../../constants/Colors';

interface Props {
    route: RouteProp<any>;
}

const PostScreen: React.FC<Props> = ({ route }) => {
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(''); // base64

    const theme = useSelector((state: RootState) => state.theme);
    const { token } = useSelector((state: RootState) => state.user);
    const post = useSelector((state: RootState) => state.posts.microblog.data.find(({ id }) => id === route.params?.postId));

    const dispatch = useDispatch();
    const styles = useMemo(() => styling(theme), [theme]);
    const commentInputRef = useRef<TextInput>(null);

    const fetchPost = async () => {
        const response: any = await api.get(`/posts/${route.params?.postId}`, token);

        if (response.data[0]) {
            dispatch(updatePost(response.data[0]));
        }
    }

    useEffect(() => { fetchPost() }, []);

    const sendComment = () => {
        if (comment === '' && image === '') return;

        api.post('/posts', {
            text: comment,
            image,
            parentId: post?.id
        }, token)
        .then((res: any) => {
            if (res.data.error) {
                Alert.alert('', res.data.message);
                return;
            }

            const comment = res.data;
            dispatch(createComment({ postId: post?.id, comment }));

            setComment('');
            setImage('');
            commentInputRef.current?.blur();
        });
    }

    const onReply = (post: PostProps) => {
        setComment(`@${post.user.name} `);
        commentInputRef.current?.focus();
    }

    if (post) {
        return (
            <PrimaryContainer style={styles.container}>
                <FlatList
                    data={[post]}
                    renderItem={() => (
                        <PostWrapper theme={theme}>
                            <Post
                                {...post}
                                type="original"
                                onReply={onReply}
                                commentsShown
                            />
                        </PostWrapper>
                    )}
                    contentContainerStyle={styles.scrollView}
                    keyboardShouldPersistTaps="always"
                />
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        onChangeText={txt => setComment(txt)}
                        value={comment}
                        ref={commentInputRef}
                    />
                    <Icon name="send" size={30} style={styles.sendIcon} onPress={sendComment} />
                </View>
            </PrimaryContainer>
        );
    }
    
    return null;
}

const styling = (theme: Theme) => StyleSheet.create({
    container: {
        padding: 5
    },
    scrollView: {
        paddingBottom: 80
    },
    footer: {
        maxHeight: 150,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors[theme].white,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderColor: '#ddd'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        flex: 1,
        paddingHorizontal: 10,
    },
    sendIcon: {
        marginLeft: 15,
    }
});

export default PostScreen;
