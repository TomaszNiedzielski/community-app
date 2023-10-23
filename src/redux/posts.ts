import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import { RootState } from './store';

interface FetchPostsProps {
    id?: number;
    token?: string;
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async ({ id, token }: FetchPostsProps, { getState }) => {
        const { posts } = getState() as RootState;

        const response: any = await api.get(`/posts/${id || '?page=' + posts.page}`, token);

        if (id) {
            return response.data;
        }

        return response.data.data;
    }
);

export interface PostProps {
    id: number | string;
    user: {
        id: number;
        name: string;
        avatar?: string;
        badge?: string;
    },
    text: string;
    image: string;
    likesCount: number;
    viewsCount?: number;
    comments: {
        count: number;
        items: PostProps[];
    };
    isLiked: boolean;
    createdAt: string;
}

const initialState: {
    data: PostProps[];
    loading: boolean;
    reloading: boolean;
    page: number;
    isLastPage: boolean;
} = {
    data: [],
    loading: false,
    reloading: false,
    page: 1,
    isLastPage: false,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        createPost: (state, action) => {
            state.data.unshift(action.payload.post);
        },
        createComment: (state, action) => {
            const post = state.data.find(({ id }) => id === action.payload.postId);

            post?.comments?.items.push(action.payload.comment);
        },
        likeThePost: (state, action) => {
            let postToUpdate;
            postToUpdate = state.data.find(({ id }) => action.payload.postId === id);

            if (!postToUpdate) {
                state.data.map(post => {
                    post.comments?.items.map(comment => {
                        if (comment.id === action.payload.postId) {
                            postToUpdate = comment;
                        }
                    });
                });
            }

            if (postToUpdate) {
                if (postToUpdate.isLiked) {
                    postToUpdate.isLiked = false;
                    postToUpdate.likesCount--;
                } else {
                    postToUpdate.isLiked = true;
                    postToUpdate.likesCount++;
                }
            }
        },
        deletePost: (state, action) => {
            const updatedData = state.data.filter(post => post.id !== action.payload.postId);

            if (updatedData.length !== state.data.length) {
                state.data = updatedData;
            }

            // Check if post is in comments
            state.data.map(post => {
                if (post.comments) {
                    post.comments.items = post.comments.items.filter(comment => comment.id !== action.payload.postId);
                    post.comments.count--;
                }
            });
        },
        setAllComments: (state, action) => {
            const post = state.data.find(post => post.id === action.payload.postId);
            
            if (post) {
                post.comments = action.payload.comments;
            }
        },
        updatePost: (state, action) => {
            state.data = state.data.map(item => {
                if (item.id === action.payload.id) {
                    item = action.payload;
                }
                return item;
            });
        },
        resetPosts: () => {
            return initialState;
        },
        resetPage: (state) => {
            state.page = 1;
            state.isLastPage = false;
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                if (state.page === 1) {
                    state.reloading = true;
                } else {
                    state.loading = true;
                }
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.reloading = false;
                state.loading = false;
                if (action.payload.length === 0) {
                    state.isLastPage = true;
                } else {
                    let newPosts = state.page === 1 ? action.payload : [...state.data, ...action.payload];
                    state.data = removePostDuplicates(newPosts);
                    state.page++;
                }
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.reloading = false;
                state.loading = false;
            });
    }
});

export const { createPost, createComment, likeThePost, deletePost, setAllComments, updatePost, resetPosts, resetPage } = postsSlice.actions;

export default postsSlice.reducer;

/**
 * FIX_REQUIRED
 * Just a safety feature. Propably it can be removed in the future.
 */
const removePostDuplicates = (posts: PostProps[]) => {
    const uniquePosts = posts.reduce((unique: PostProps[], post) => {
        const postExists = unique.some((p: PostProps) => p.id === post.id);
    
        if (!postExists) {
            unique.push(post);
        }
  
        return unique;
    }, []);
  
    return uniquePosts;
}
