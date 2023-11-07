import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../../constants/Colors';
import { PostProps, PostType } from '../../../redux/posts';
import { RootState } from '../../../redux/store';
import ManageButton from './ManageButton';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';

interface Props {
    onReply: () => void;
    onOpen: () => void;
    postId: PostProps['id'];
    postAuthorId: PostProps['user']['id'];
    viewsCount: PostProps['viewsCount'];
    commentsCount: PostProps['comments']['count'];
    type: PostType;
}

const PostFooter: React.FC<Props> = ({ onReply, onOpen, postId, postAuthorId, viewsCount, commentsCount, type }) => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                {type === 'original' && <TouchableOpacity
                    style={styles.itemWrapper}
                    hitSlop={styles.hitSlop}
                    onPress={onOpen}
                >
                    <IconFontAwesome name="comments" size={16} color={Colors.gray} />
                    <Text style={styles.title}>{commentsCount}</Text>
                </TouchableOpacity>}

                <TouchableOpacity
                    style={styles.itemWrapper}
                    hitSlop={styles.hitSlop}
                    onPress={onReply}
                >
                    <IconEntypo name="reply" size={16} color={Colors.gray} />
                    <Text style={styles.title}>Reply</Text>
                </TouchableOpacity>

                {viewsCount !== undefined && <View style={styles.itemWrapper}>
                    <IconFontAwesome name="eye" size={16} color={Colors.black} />
                    <Text style={styles.title}>{viewsCount}</Text>
                </View>}
            </View>
            {postAuthorId === user.id && <ManageButton
                postId={postId}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    left: {
        flexDirection: 'row'
    },
    icon: {
        height: 15,
        width: 15,
    },
    title: {
        color: Colors.gray,
        fontSize: 10,
        marginLeft: 8,
        fontWeight: '500',
    },
    hitSlop: {
        top: 20,
        left: 20,
        bottom: 20,
        right: 20,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        marginRight: 40,
    }
});

export default PostFooter;
