import { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import Colors from '../constants/Colors';
import UserScreen from '../screens/user/UserScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { openSheet } from '../redux/sheet';

const Stack = createNativeStackNavigator();

interface Props {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any>;
}

const UserNavigator: React.FC<Props> = ({ route, navigation }) => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'SearchContacts' || routeName === 'Chat') {
            navigation.setOptions({ tabBarStyle: { display: 'none' } } as any);
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } } as any);
        }
    }, [navigation, route]);

    const openUserSettingsSheet = () => {
        dispatch(openSheet({ value: true, name: 'UserSettings' }));
    }

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
                name="User"
                component={UserScreen}
                options={{
                    headerRight: () => (
                        <TouchableOpacity onPress={openUserSettingsSheet} hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}>
                            <Icon name="settings-sharp" size={20} color={Colors.white} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default UserNavigator;
