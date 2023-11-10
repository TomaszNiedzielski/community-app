import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './src/redux/store';
import { restoreUser } from './src/storage/user';
import { getUser } from './src/redux/user';
import MainNavigator from './src/navigators/MainNavigator';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BottomSheetContainer from './src/components/modules/sheets/BottomSheetContainer';
import Colors from './src/constants/Colors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { StatusBar } from 'react-native';
import AuthNavigator from './src/navigators/AuthNavigator';
import PrimaryContainer from './src/components/common/PrimaryContainer';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

const AppContent: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.user);
    const [isUserRestored, setIsUserRestored] = useState(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const authenticateUser = async () => {
        const user = await restoreUser();
        setIsUserRestored(true);
        // After restore, fetch changes from API
        if (user && user.token) {
            dispatch(getUser({ token: user.token }));
        }
    }

    useEffect(() => { authenticateUser() }, []);

    useEffect(() => {
        changeNavigationBarColor(Colors.slightlyDark);
        StatusBar.setBackgroundColor(Colors.slightlyDark);
    }, []);

    if (isUserRestored) {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <NavigationContainer>
                        <Stack.Navigator>
                            {!token ? <Stack.Screen
                                name="Auth"
                                component={AuthNavigator}
                                options={{ headerShown: false }}
                            /> : 
                            <Stack.Screen
                                name="Home"
                                component={MainNavigator}
                                options={{ headerShown: false }}
                            />}
                        </Stack.Navigator>
                        <BottomSheetContainer />
                    </NavigationContainer>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        );
    }

    return <PrimaryContainer><></></PrimaryContainer>;
}

export default App;
