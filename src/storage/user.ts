import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../redux/store';
import { setUser, UserProps, logout } from '../redux/user';

export const storeUser = async (user: UserProps) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
}

export const restoreUser = async () => {
    const userData = await AsyncStorage.getItem('user');

    if (userData) {
        const user = JSON.parse(userData);
        store.dispatch(setUser(user));
        return user;
    }
}

export const getAuthToken = async () => {
    const userData = await AsyncStorage.getItem('user');

    if (userData) {
        const user = JSON.parse(userData);
        return user.token as string;
    }
}

export const logoutUser = async () => {
    await AsyncStorage.removeItem('user');

    store.dispatch(logout());
}
