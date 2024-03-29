import React, { useMemo, useCallback } from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import Post, { PostWrapper } from '../../components/modules/microblog/Post';
import Colors from '../../constants/Colors';
import { fetchPosts, resetPage } from '../../redux/posts';
import { RootState } from '../../redux/store';
import NetInfoAlert from '../../components/common/NetInfoAlert';

interface Props {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any>;
}

const MicroblogScreen: React.FC<Props> = ({ navigation, route }) => {
    const posts = useSelector((state: RootState) => state.posts);
    const token = useSelector((state: RootState) => state.user.token);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    useFocusEffect(
        useCallback(() => {
            if ((route.name !== 'MicroblogHome' && '#'+posts.microblog.tag !== route.name) || (route.name === 'MicroblogHome' && route.name !== posts.microblog.tag)) {
                dispatch(resetPage('microblog'));
                getPosts();
            }
        }, [posts.microblog.tag, route.name]),
    );

    const getPosts = () => {
        dispatch(fetchPosts({
            token,
            tag: route.name.replace('#', '')
        }));
    }

    const renderPostItem = useMemo(() => {
        return ({ item }: any) => (
            <PostWrapper key={item.id}>
                <Post
                    {...item}
                    type="original"
                    onReply={() => navigation.navigate('Post', { postId: item.id, action: 'ON_REPLY' })}
                    onOpen={() => navigation.navigate('Post', { postId: item.id })}
                    isImageCollapsed
                />
            </PostWrapper>
        );
    }, []);

    const onRefresh = () => {
        dispatch(resetPage('microblog'));
        getPosts();
    }

    const onEndReached = () => {
        if (!posts['microblog'].loading && !posts['microblog'].reloading && !posts['microblog'].isLastPage) {
            getPosts();
        }
    }

    return (
        <PrimaryContainer>
            <FlatList
                data={posts['microblog'].data}
                renderItem={renderPostItem}
                refreshing={posts['microblog'].reloading}
                onRefresh={onRefresh}
                keyboardShouldPersistTaps="always"
                onEndReached={onEndReached}
                ListFooterComponent={() => posts['microblog'].loading ? <ActivityIndicator color={Colors.primary} /> : null}
                ListFooterComponentStyle={styles.footer}
            />
            <NetInfoAlert />
        </PrimaryContainer>
    );
}

const styles = StyleSheet.create({
    footer: {
        height: 30,
        padding: 10
    }
});

export default MicroblogScreen;
