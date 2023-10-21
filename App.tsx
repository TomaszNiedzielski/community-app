import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './src/redux/store';
// import FlashMessage from 'react-native-flash-message';
// import { getUser as restoreUser } from './src/storage/user';
// import { getUser } from './src/redux/user';
import MainNavigator from './src/navigators/MainNavigator';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

const AppContent: React.FC = () => {
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
        // <FlashMessage position="top" />
    );
}

export default App;
