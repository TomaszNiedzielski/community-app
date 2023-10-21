import React, { useMemo } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Colors, { Theme } from '../../../constants/Colors';
import { likeThePost, PostProps } from '../../../redux/posts';
import { RootState } from '../../../redux/store';
import api from '../../../utils/api';
import LikeButton from './LikeButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface Props extends Omit<PostProps, 'id' | 'text' | 'image' | 'comments'> {
    postId: PostProps['id'];
}

const PostHeader: React.FC<Props> = ({ postId, user, createdAt, isLiked, likesCount }) => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.user.token);
    const theme = useSelector((state: RootState) => state.theme);
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

    const styles = useMemo(() => styling(theme), [theme]);

    /**
     * FIX_REQUIRED
     * 
     * Comment's date should not be link
     */
    return (
        <View style={styles.container}>
            <View style={styles.user}>
                {user.avatar
                ? <Image
                    source={{ uri: user.avatar }}
                    style={styles.avatar}
                />
                : <Text style={styles.avatar}>{user.name[0]}</Text>}
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

const styling = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    user: {
        flexDirection: 'row'
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: Colors[theme].primary,
        color: '#fff',
        fontSize: 22,
        fontFamily: 'Inter-Bold'
    },
    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: 'gold',
        fontWeight: 'bold',

    },
    createdAt: {
        fontSize: 11,
        // color: Colors.gray,
    },
    badge: {
        color: 'red',
        fontSize: 12,
        fontWeight: 'bold',
    }
});

export default PostHeader;
