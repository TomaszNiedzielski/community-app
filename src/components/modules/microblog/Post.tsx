import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors, { Theme } from '../../../constants/Colors';
import { PostProps, PostType } from '../../../redux/posts';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import PostImage from './PostImage';

interface Props extends PostProps {
    type: PostType;
    onReply: (post: PostProps) => void;
    commentsShown?: boolean;
}

export const PostWrapper: React.FC<{ children: React.ReactNode; theme: Theme; }> = ({ children, theme }) => {
    const styles = useMemo(() => styling(theme), [theme]);

    return (
        <View style={styles.container}>{children}</View>
    );
}

const CommentWrapper: React.FC<{ children: React.ReactNode; theme: Theme; }> = ({ children, theme }) => {
    const styles = useMemo(() => styling(theme), [theme]);

    return (
        <View style={styles.commentWraper}>{children}</View>
    );
}

const Post: React.FC<Props> = React.memo(post => {
    const { id, user, text, image, likesCount, viewsCount, comments, isLiked, createdAt, type = 'original', onReply, commentsShown } = post;
    const theme = useSelector((state: RootState) => state.theme);

    /**
     * FIX_REQUIRED
     * 
     * All comments are rerendered when one item is liked
     */
    const renderComment = useMemo(() => {
        return ({ item }: any) => (
            <CommentWrapper key={item.id} theme={theme}>
                <Post
                    {...item}
                    type="comment"
                    onReply={() => onReply({
                        ...post,
                        text: item.text,
                        user: {
                            ...post.user,
                            name: item.user.name
                        }
                    })}
                />
            </CommentWrapper>
        );
    }, []);

    const styles = useMemo(() => styling(theme), [theme]);

    /**
    * FIX_REQUIRED
    * 
    * ScalableImage is not the best fit cause it depends on screen padding. It cuts sides of the image in the comments.
    */
    return (
        <View>
            <PostHeader
                postId={id}
                user={user}
                likesCount={likesCount}
                isLiked={isLiked}
                createdAt={createdAt}
                type={type}
            />
            {text ? <Text style={styles.text}>{text}</Text> : null}
            {image && <PostImage
                uri={image}
            />}
            <PostFooter
                postId={id}
                postAuthorId={user.id}
                onReply={() => onReply(post)}
                viewsCount={viewsCount}
                commentsCount={comments?.count}
                type={type}
            />
            {type === 'original' && <View>
                {comments?.items.length && commentsShown ? <>
                    <View style={styles.commentsBorder} />
                    <FlatList
                        data={comments.items}
                        renderItem={renderComment}
                    />
                </> : null}
            </View>}
        </View>
    );
});

const styling = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: Colors[theme].white,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: Colors[theme].lightGray
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    text: {
        color: Colors[theme].black,
        marginTop: 10,
        lineHeight: 19,
    },
    image: {
        width: '100%',
        marginTop: 10,
        borderRadius: 4,
    },
    commentWraper: {
        borderTopWidth: 1,
        borderTopColor: Colors[theme].lightGray,
        marginLeft: 20,
        paddingTop: 15
    },
    commentsBorder: {
        marginTop: 10
    }
});

export default Post;
