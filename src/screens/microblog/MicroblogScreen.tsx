import React, { useEffect, useMemo } from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryContainer from '../../components/common/PrimaryContainer';
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
    const navigation = useNavigation<any>();

    useEffect(() => {
        if (route.params?.action !== 'NO_LOADING') {
            dispatch(resetPage('microblog'));
            getPosts();
        }
    }, [token]);

    const getPosts = () => {
        dispatch(fetchPosts({ token: token }));
    }

    const renderPostItem = useMemo(() => {
        return ({ item }: any) => (
            <PostWrapper key={item.id} theme={theme}>
                <Post
                    {...item}
                    type="original"
                    onReply={() => navigation.navigate('Post', { postId: item.id })}
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

    const styles = useMemo(() => styling(theme), [theme]);

    return (
        <PrimaryContainer style={styles.container}>
            <FlatList
                data={posts['microblog'].data}
                renderItem={renderPostItem}
                refreshing={posts['microblog'].reloading}
                onRefresh={onRefresh}
                keyboardShouldPersistTaps="always"
                onEndReached={onEndReached}
                ListFooterComponent={() => posts['microblog'].loading ? <ActivityIndicator color={Colors[theme].primary} /> : null}
                ListFooterComponentStyle={styles.footer}
            />
            <NetInfoAlert />
        </PrimaryContainer>
    );
}

const styling = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: '#ddd'
    },
    footer: {
        height: 30,
        padding: 10
    }
});

export default MicroblogScreen;
