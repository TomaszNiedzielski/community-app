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

        const response: any = await api.get(`/posts/${id || '?page=' + posts['microblog'].page}`, token);

        if (id) {
            return response.data;
        }

        return response.data.data;
    }
);

export const fetchUserPosts = createAsyncThunk(
    'posts/fetchUserPosts',
    async ({ id, token }: FetchPostsProps, { getState }) => {
        const { posts } = getState() as RootState;
        const response: any = await api.get(`/users/${id}/posts?page=${posts['profile'].page}`, token);

        return response.data.data;
    }
);

export const deletePost = createAsyncThunk(
    'posts/delete',
    async ({ id, token }: FetchPostsProps) => {
        await api.delete(`/posts/${id}`, token);

        return { postId: id };
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

type DataProperties = 'microblog' | 'profile';

export interface PostsStore {
    data: PostProps[];
    loading: boolean;
    reloading: boolean;
    page: number;
    isLastPage: boolean;
}

const initialPostsStore: PostsStore = {
    data: [],
    loading: false,
    reloading: false,
    page: 1,
    isLastPage: false,
}

const initialState = {
    microblog: initialPostsStore,
    profile: initialPostsStore,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        createPost: (state, action) => {
            function handleTask(storeName: DataProperties) {
                state[storeName].data.unshift(action.payload.post);
            }

            handleTask('microblog');
            handleTask('profile');
        },
        createComment: (state, action) => {
            function handleTask(storeName: DataProperties) {
                const post = state[storeName].data.find(({ id }) => id === action.payload.postId);

                post?.comments?.items.push(action.payload.comment);
            }
            
            handleTask('microblog');
            handleTask('profile');
        },
        likeThePost: (state, action) => {
            function handleTask(storeName: DataProperties) {
                let postToUpdate;
                postToUpdate = state[storeName].data.find(({ id }) => action.payload.postId === id);
    
                if (!postToUpdate) {
                    state[storeName].data.map(post => {
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
            }
            
            handleTask('microblog');
            handleTask('profile');
        },
        setAllComments: (state, action) => {
            // Inactive now because of disabled ShowCommentsButton
            // It should show only comments from one specified store

            function handleTask(storeName: DataProperties) {
                const post = state[storeName].data.find(post => post.id === action.payload.postId);
            
                if (post) {
                    post.comments = action.payload.comments;
                }
            }

            handleTask('microblog');
            handleTask('profile');
        },
        updatePost: (state, action) => {
            function handleTask(storeName: DataProperties) {
                state[storeName].data = state[storeName].data.map(item => {
                    if (item.id === action.payload.id) {
                        item = action.payload;
                    }
                    return item;
                });
            }
            
            handleTask('microblog');
            handleTask('profile');
        },
        resetPage: (state, action) => {
            const storeName: DataProperties = action.payload;

            state[storeName].page = 1;
            state[storeName].isLastPage = false;
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                if (state['microblog'].page === 1) {
                    state['microblog'].reloading = true;
                } else {
                    state['microblog'].loading = true;
                }
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state['microblog'].reloading = false;
                state['microblog'].loading = false;
                
                if (action.payload.length === 0) {
                    state['microblog'].isLastPage = true;
                } else {
                    let newPosts = state['microblog'].page === 1 ? action.payload : [...state['microblog'].data, ...action.payload];
                    state['microblog'].data = removePostDuplicates(newPosts);
                    state['microblog'].page++;
                }
            })
            .addCase(fetchPosts.rejected, (state) => {
                state['microblog'].reloading = false;
                state['microblog'].loading = false;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                function handleTask(storeName: DataProperties) {
                    const updatedData = state[storeName].data.filter(post => post.id !== action.payload.postId);

                    if (updatedData.length !== state[storeName].data.length) {
                        state[storeName].data = updatedData;
                    }
    
                    // Check if post is in comments
                    state[storeName].data.map(post => {
                        if (post.comments) {
                            const updatedItems = post.comments.items.filter(comment => comment.id !== action.payload.postId);
    
                            if (updatedItems.length !== post.comments.items.length) {
                                post.comments.items = updatedItems;
                                post.comments.count--;
                            }
                        }
                    });
                }

                handleTask('microblog');
                handleTask('profile');
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state['profile'].reloading = false;
                state['profile'].loading = false;
                
                if (action.payload.length === 0) {
                    state['profile'].isLastPage = true;
                } else {
                    let newPosts = state['profile'].page === 1 ? action.payload : [...state['profile'].data, ...action.payload];
                    state['profile'].data = removePostDuplicates(newPosts);
                    state['profile'].page++;
                }
            })
    }
});

export const { createPost, createComment, likeThePost, setAllComments, updatePost, resetPage } = postsSlice.actions;

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
