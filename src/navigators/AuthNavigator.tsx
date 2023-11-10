import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../constants/Colors';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.slightlyDark,
                },
                headerTintColor: Colors.white
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />
        </Stack.Navigator>
    );
}

export default AuthNavigator;
