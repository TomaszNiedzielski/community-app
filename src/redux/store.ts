import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import posts from './posts';
import theme from './theme';

export const store = configureStore({
    reducer: {
        user,
        posts,
        theme,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
