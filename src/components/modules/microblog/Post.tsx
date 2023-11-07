import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors from '../../../constants/Colors';
import { PostProps, PostType } from '../../../redux/posts';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostImage from './PostImage';

interface Props extends PostProps {
    type: PostType;
    onReply: (post: PostProps) => void;
    onOpen?: (post: PostProps) => void;
    commentsShown?: boolean;
    isImageCollapsed?: boolean;
}

export const PostWrapper: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    return (
        <View style={styles.container}>{children}</View>
    );
}

const CommentWrapper: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    return (
        <View style={styles.commentWraper}>{children}</View>
    );
}

const Post: React.FC<Props> = React.memo(post => {
    const { id, user, text, image, likesCount, viewsCount, comments, isLiked, createdAt, type = 'original', onReply, onOpen, commentsShown, isImageCollapsed } = post;

    /**
     * FIX_REQUIRED
     * 
     * All comments are rerendered when one item is liked
     */
    const renderComment = useMemo(() => {
        return ({ item }: any) => (
            <CommentWrapper key={item.id}>
                <Post
                    {...item}
                    type="comment"
                    onReply={onReply}
                />
            </CommentWrapper>
        );
    }, []);

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
                collapsed={isImageCollapsed}
            />}
            <PostFooter
                postId={id}
                postAuthorId={user.id}
                onReply={() => onReply(post)}
                onOpen={() => onOpen && onOpen(post)}
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

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: Colors.slightlyDark
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    text: {
        color: Colors.white,
        marginTop: 10,
        lineHeight: 19,
    },
    image: {
        width: '100%',
        marginTop: 10,
        borderRadius: 4,
    },
    commentWraper: {
        borderTopWidth: .2,
        borderTopColor: Colors.gray,
        marginLeft: 20,
        paddingTop: 15,
        paddingBottom: 10,
    },
    commentsBorder: {
        marginTop: 10
    }
});

export default Post;
