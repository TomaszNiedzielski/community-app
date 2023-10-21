import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '../constants/Colors';

const initialState: Theme = 'light';

const themeSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTheme: (_state, action) => {
            return action.payload;
        }
    },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
