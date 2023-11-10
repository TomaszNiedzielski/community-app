import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import { storeUser } from '../storage/user';
import { RootState } from './store';
import { Alert } from 'react-native';

interface UpdateAvatarProps {
    avatar: string;
    token: string;
}

export const updateAvatar = createAsyncThunk(
    'user/avatar',
    async ({ avatar, token }: UpdateAvatarProps, { getState }) => {
        const { user } = getState() as RootState;
        const res: any = await api.patch('/avatar', { avatar }, token);

        if (res.data.error) {
            Alert.alert('', res.data.message);
            return;
        }

        storeUser({...user, avatar: {
            url: res.data.avatar,
            pending: false
        }});

        return res.data.avatar;
    }
);

interface GetUserProps {
    token: string;
}

export const getUser = createAsyncThunk(
    'user/get',
    async ({ token }: GetUserProps) => {
        const res: any = await api.get('/user', token);

        const user = {
            ...res.data,
            token,
            avatar: {
                ...res.data.avatar,
                pending: false,
            }
        }

        storeUser(user);

        return user;
    }
);

export interface UserProps {
    id: number;
    name: string;
    email: string;
    token: string;
    avatar: {
        url: string;
        pending?: boolean;
    };
}

const initialState: UserProps = {
    id: 0,
    name: '',
    email: '',
    token: '',
    avatar: {
        url: '',
        pending: false
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_state, action) => {
            return action.payload;
        },
        logout: () => {
            return initialState;
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
        builder
            .addCase(updateAvatar.pending, (state) => {
                state.avatar.pending = true;
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                if (action.payload) {
                    state.avatar.url = action.payload;
                }
                state.avatar.pending = false;
            })
            .addCase(updateAvatar.rejected, (state) => {
                state.avatar.pending = false;
            })
            .addCase(getUser.fulfilled, (_state, action) => {
                return action.payload;
            })
    }
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
