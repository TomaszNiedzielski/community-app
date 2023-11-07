import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../../constants/Colors';
import { likeThePost, PostProps, PostType } from '../../../redux/posts';
import { RootState } from '../../../redux/store';
import api from '../../../utils/api';
import LikeButton from './LikeButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from './Avatar';
dayjs.extend(relativeTime);

interface Props extends Omit<PostProps, 'id' | 'text' | 'image' | 'comments'> {
    postId: PostProps['id'];
    type: PostType;
}

const PostHeader: React.FC<Props> = ({ postId, user, createdAt, isLiked, likesCount, type }) => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.user.token);
    const navigation = useNavigation<any>();

    const handleLikeButtonPress = () => {
        if (!token) {
            navigation.navigate('Register');
            return;
        }

        if (isLiked) {
            api.delete(`/posts/${postId}/unlike`, token);
        } else {
            api.post(`/posts/${postId}/like`, {}, token);
        }

        dispatch(likeThePost({ postId: postId }))
    }

    const convertUTCDateToLocalDate = () => {
        const date = new Date(createdAt);
        const localTimeZoneDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
        
        return dayjs(localTimeZoneDate).from(dayjs());
    }

    const navigateToPost = () => {
        navigation.navigate('Post', { postId });
    }

    /**
     * FIX_REQUIRED
     * 
     * Comment's date should not be link
     */
    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <Avatar
                    url={user.avatar}
                    name={user.name}
                    small={type === 'comment'}
                />
                <View style={{ marginLeft: 16 }}>
                    <View style={styles.nameWrapper}>
                        <Text style={styles.name}>{user.name}</Text>
                        {user.badge && <Text style={styles.badge}> ({user.badge})</Text>}
                    </View>
                    <Text style={styles.createdAt} onPress={navigateToPost}>{convertUTCDateToLocalDate()}</Text>
                </View>
            </View>
            <LikeButton
                onPress={handleLikeButtonPress}
                isLiked={isLiked}
                likesCount={likesCount}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    user: {
        flexDirection: 'row'
    },
    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    createdAt: {
        fontSize: 11,
        color: Colors.lightGray
    },
    badge: {
        color: 'red',
        fontSize: 12,
        fontWeight: 'bold',
    }
});

export default PostHeader;
