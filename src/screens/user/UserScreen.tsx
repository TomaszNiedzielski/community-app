import { StyleSheet, View, Text } from 'react-native';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import ProfileImage from '../../components/modules/user/ProfileImage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PostsList from '../../components/modules/user/PostsList';
import { useEffect } from 'react';
import { fetchUserPosts, resetPage } from '../../redux/posts';
import { ThunkDispatch } from '@reduxjs/toolkit';

const UserScreen: React.FC = () => {
    const { name, token, id } = useSelector((state: RootState) => state.user);
    const posts = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    useEffect(() => { getPosts() }, [token, id]);

    const getPosts = () => {
        dispatch(fetchUserPosts({ token, id }));
    }

    const onRefresh = () => {
        dispatch(resetPage('profile'));
        getPosts();
    }

    const onEndReached = () => {
        if (!posts['profile'].loading && !posts['profile'].reloading && !posts['profile'].isLastPage) {
            getPosts();
        }
    }

    return (
        <PrimaryContainer style={styles.container}>
            <PostsList
                posts={posts.profile}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                ListHeaderComponent={() => (
                    <View style={styles.profileInfo}>
                        <ProfileImage />
                        <Text style={styles.userName}>{name}</Text>
                    </View>
                )}
            />
        </PrimaryContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
    },
    profileInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    userName: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 15,
    }
});

export default UserScreen;
