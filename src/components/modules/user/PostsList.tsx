import { useMemo } from 'react';
import { FlatList, FlatListProps, StyleSheet, ActivityIndicator } from 'react-native';
import { PostProps, PostsStore } from '../../../redux/posts';
import Post, { PostWrapper } from '../microblog/Post';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../constants/Colors';

interface Props extends Omit<FlatListProps<PostProps>, 'data' | 'renderItem'> {
    posts: PostsStore;
}

const PostsList: React.FC<Props> = (props) => {
    const navigation = useNavigation<any>();

    const renderPostItem = useMemo(() => {
        return ({ item }: any) => (
            <PostWrapper key={item.id}>
                <Post
                    {...item}
                    type="original"
                    onReply={() => navigation.navigate('Post', { postId: item.id, action: 'ON_REPLY' })}
                    onOpen={() => navigation.navigate('Post', { postId: item.id })}
                />
            </PostWrapper>
        );
    }, []);

    return (
        <FlatList
            data={props.posts.data}
            renderItem={renderPostItem}
            refreshing={props.posts.reloading}
            onRefresh={props.onRefresh}
            keyboardShouldPersistTaps="always"
            onEndReached={props.onEndReached}
            ListFooterComponent={() => props.posts.loading ? <ActivityIndicator color={Colors.primary} /> : null}
            ListFooterComponentStyle={styles.footer}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    footer: {
        height: 30,
        padding: 10
    }
});

export default PostsList;
