import { createSlice } from '@reduxjs/toolkit';

interface Sheet {
    isVisible: boolean;
    name: 'PostManager' | 'UserSettings' | null;
    data: any;
}

const initialState: Sheet = {
    isVisible: false,
    name: null,
    data: null,
}

const sheetSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        openSheet: (state, action) => {
            state.isVisible = action.payload.value;
            state.name = action.payload.name;
            state.data = action.payload.data;
        },
        closeSheet: (state) => {
            state.isVisible = false;
            state.name = null;
            state.data = null;
        }
    },
});

export const { openSheet, closeSheet } = sheetSlice.actions;

export default sheetSlice.reducer;
