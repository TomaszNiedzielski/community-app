import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import posts from './posts';
import theme from './theme';
import sheet from './sheet';

export const store = configureStore({
    reducer: {
        user,
        posts,
        theme,
        sheet,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
