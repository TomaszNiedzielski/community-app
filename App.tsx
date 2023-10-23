import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/redux/store';
// import FlashMessage from 'react-native-flash-message';
import { restoreUser } from './src/storage/user';
import { getUser } from './src/redux/user';
import MainNavigator from './src/navigators/MainNavigator';
import { ThunkDispatch } from '@reduxjs/toolkit';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

const AppContent: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const authenticateUser = async () => {
        const user = await restoreUser();
        // After restore, fetch changes from API
        if (user && user.token) {
            dispatch(getUser({ token: user.token }));
        }
    }

    useEffect(() => { authenticateUser() }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={MainNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
