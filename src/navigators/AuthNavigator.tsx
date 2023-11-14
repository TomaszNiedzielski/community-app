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
                    backgroundColor: Colors.dark,
                },
                headerTintColor: Colors.white
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: 'Log In'
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    title: 'Sign Up'
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthNavigator;
