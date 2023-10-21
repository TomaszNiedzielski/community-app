import React, { useEffect, useMemo } from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import Header from '../../components/modules/microblog/Header';
import Post, { PostWrapper } from '../../components/modules/microblog/Post';
import Colors, { Theme } from '../../constants/Colors';
import { fetchPosts, resetPage } from '../../redux/posts';
import { RootState } from '../../redux/store';
import NetInfoAlert from '../../components/common/NetInfoAlert';

interface Props {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any>;
}

const MicroblogScreen: React.FC<Props> = ({ route }) => {
    const posts = useSelector((state: RootState) => state.posts);
    const theme = useSelector((state: RootState) => state.theme);
    const token = useSelector((state: RootState) => state.user.token);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    useEffect(() => {
        if (route.params?.action !== 'NO_LOADING') {
            dispatch(resetPage());
            getPosts();
        }
    }, [token]);

    const getPosts = () => {
        dispatch(fetchPosts({ token: token }));
    }

    // const onAccept = () => {
    //     if (newPostText === '' && newPostImageBase64 === '') return;

    //     api.post('/posts', {
    //         text: newPostText,
    //         image: newPostImageBase64,
    //         parentId: replyingTo?.id
    //     }, token)
    //     .then((res: any) => {
    //         if (res.data.error) {
    //             Alert.alert('', res.data.message);
    //             return;
    //         }

    //         const post = res.data;

    //         if (replyingTo) {
    //             dispatch(createComment({ postId: replyingTo.id, comment: post }));
    //         } else {
    //             dispatch(createPost({ post }));
    //         }
    //     })
    //     .finally(() => {
    //         onClose();
    //     });
    // }

    const renderPostItem = useMemo(() => {
        return ({ item }: any) => (
            <PostWrapper key={item.id} theme={theme}>
                <Post
                    {...item}
                    type="original"
                />
            </PostWrapper>
        );
    }, []);

    const onRefresh = () => {
        dispatch(resetPage());
        getPosts();
    }

    const onEndReached = () => {
        if (!posts.loading && !posts.reloading && !posts.isLastPage) {
            getPosts();
        }
    }

    const styles = useMemo(() => styling(theme), [theme]);

    return (
        <PrimaryContainer style={styles.container}>
            <Header />
            <FlatList
                data={posts.data}
                renderItem={renderPostItem}
                refreshing={posts.reloading}
                onRefresh={onRefresh}
                keyboardShouldPersistTaps="always"
                onEndReached={onEndReached}
                ListFooterComponent={() => posts.loading ? <ActivityIndicator color={Colors[theme].primary} /> : null}
                ListFooterComponentStyle={styles.footer}
            />
            <NetInfoAlert />
        </PrimaryContainer>
    );
}

const styling = (theme: Theme) => StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: Colors[theme].white
    },
    footer: {
        height: 30,
        padding: 10
    }
});

export default MicroblogScreen;
