import { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View, Alert, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Post, { PostWrapper } from '../../components/modules/microblog/Post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import api from '../../utils/api';
import { PostProps, createComment, updatePost } from '../../redux/posts';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import FullScreenLoader from '../../components/common/FullScreenLoader';

interface Props {
    route: RouteProp<any>;
}

const PostScreen: React.FC<Props> = ({ route }) => {
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(''); // base64
    const [post, setPost] = useState<PostProps>();
    const [isSendingComment, setIsSendingComment] = useState(false);

    const { token } = useSelector((state: RootState) => state.user);
    const postMicroblog = useSelector((state: RootState) => state.posts.microblog.data.find(({ id }) => id === route.params?.postId));
    const postProfile = useSelector((state: RootState) => state.posts.profile.data.find(({ id }) => id === route.params?.postId));

    useEffect(() => {
        setPost(postMicroblog ?? postProfile);
    }, [postMicroblog, postProfile]);

    const dispatch = useDispatch();
    const commentInputRef = useRef<TextInput>(null);

    const fetchPost = async () => {
        const response: any = await api.get(`/posts/${route.params?.postId}`, token);

        if (response.data[0]) {
            dispatch(updatePost(response.data[0]));
        }
    }

    useEffect(() => { fetchPost() }, [route.params?.postId]);

    const sendComment = () => {
        if (comment === '' && image === '') return;

        setIsSendingComment(true);

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
        })
        .finally(() => setIsSendingComment(false));
    }

    const onReply = (post: PostProps) => {
        setComment(`@${post.user.name} `);
        commentInputRef.current?.focus();
    }

    if (post) {
        return (
            <PrimaryContainer>
                <FlatList
                    data={[post]}
                    renderItem={() => (
                        <PostWrapper>
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
                        placeholder="Write a comment..."
                        placeholderTextColor={Colors.white}
                        cursorColor={Colors.white}
                        autoFocus={route.params?.action === 'ON_REPLY'}
                    />
                    {comment.length ? <Icon name="send" size={30} style={styles.sendIcon} onPress={sendComment} /> : null}
                </View>
                <FullScreenLoader visible={isSendingComment} />
            </PrimaryContainer>
        );
    }
    
    return <PrimaryContainer><></></PrimaryContainer>;
}

const styles = StyleSheet.create({
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
        backgroundColor: Colors.slightlyDark,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: Colors.white,
        color: Colors.white
    },
    sendIcon: {
        marginLeft: 15,
        color: Colors.white
    }
});

export default PostScreen;
