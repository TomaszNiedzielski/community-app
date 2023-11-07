import { useLayoutEffect } from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import Colors from '../constants/Colors';
import UserScreen from '../screens/user/UserScreen';

const Stack = createNativeStackNavigator();

interface Props {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any>;
}

const UserNavigator: React.FC<Props> = ({ route, navigation }) => {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'SearchContacts' || routeName === 'Chat') {
            navigation.setOptions({ tabBarStyle: { display: 'none' } } as any);
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } } as any);
        }
    }, [navigation, route]);

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
                name="User"
                component={UserScreen}
            />
        </Stack.Navigator>
    );
}

export default UserNavigator;
