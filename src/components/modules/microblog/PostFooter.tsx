import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Colors, { Theme } from '../../../constants/Colors';
import { PostProps } from '../../../redux/posts';
import { RootState } from '../../../redux/store';
import ManageButton from './ManageButton';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';

interface Props {
    onReply: () => void;
    postId: PostProps['id'];
    postAuthorId: PostProps['user']['id'];
    viewsCount: PostProps['viewsCount'];
    commentsCount: PostProps['comments']['count'];
}

const PostFooter: React.FC<Props> = ({ onReply, postId, postAuthorId, viewsCount, commentsCount }) => {
    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);

    const styles = useMemo(() => styling(theme), [theme]);

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <TouchableOpacity
                    style={styles.itemWrapper}
                    hitSlop={styles.hitSlop}
                    onPress={onReply}
                >
                    <IconFontAwesome name="comments" size={18} color={Colors[theme].black} />
                    <Text style={styles.title}>{commentsCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.itemWrapper}
                    hitSlop={styles.hitSlop}
                    onPress={onReply}
                >
                    <IconEntypo name="reply" size={18} color={Colors[theme].black} />
                    <Text style={styles.title}>Reply</Text>
                </TouchableOpacity>

                {viewsCount !== undefined && <View style={styles.itemWrapper}>
                    <IconFontAwesome name="eye" size={18} color={Colors[theme].black} />
                    <Text style={styles.title}>{viewsCount}</Text>
                </View>}
            </View>
            {postAuthorId === user.id && <ManageButton
                postId={postId}
            />}
        </View>
    );
}

const styling = (theme: Theme) => StyleSheet.create({
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
        color: Colors[theme].black,
        fontSize: 11,
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
        paddingVertical: 10,
        marginRight: 20,
    }
});

export default PostFooter;
