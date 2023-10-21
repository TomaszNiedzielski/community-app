import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../../constants/Colors';
import { PostProps } from '../../../redux/posts';
import { RootState } from '../../../redux/store';
import ManageButton from './ManageButton';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
    onReply: () => void;
    postId: PostProps['id'];
    postAuthorId: PostProps['user']['id'];
    viewsCount: PostProps['viewsCount'];
}

const PostFooter: React.FC<Props> = ({ onReply, postId, postAuthorId, viewsCount }) => {
    const { token, id: userId } = useSelector((state: RootState) => state.user);
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <TouchableOpacity
                    style={styles.itemWrapper}
                    hitSlop={styles.hitSlop}
                    onPress={() => {
                        if (token) {
                            onReply();
                        } else {
                            navigation.navigate('Register');
                        }
                    }}
                >
                    {/* <Image
                        source={require('../../../assets/icons/reply.png')}
                        style={styles.icon}
                    /> */}
                    <Text style={styles.title}>Reply</Text>
                </TouchableOpacity>
                {viewsCount !== undefined && <View style={styles.itemWrapper}>
                    <Icon name="eye" /* color={Colors.gray} */ size={styles.icon.height} />
                    <Text style={styles.title}>{viewsCount}</Text>
                </View>}
            </View>
            {postAuthorId === userId && <ManageButton
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
        // color: Colors.gray,
        fontSize: 12,
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
