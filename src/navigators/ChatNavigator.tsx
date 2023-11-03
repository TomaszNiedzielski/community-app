import { useLayoutEffect } from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import RecentMessagesScreen from '../screens/chat/RecentMessagesScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchContactsScreen from '../screens/chat/SearchContactsScreen';
import ChatScreen from '../screens/chat/ChatScreen';

const Stack = createNativeStackNavigator();

interface Props {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any>;
}

const ChatNavigator: React.FC<Props> = ({ route, navigation }) => {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'SearchContacts' || routeName === 'Chat') {
            navigation.setOptions({ tabBarStyle: { display: 'none' } } as any);
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } } as any);
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RecentMessages"
                component={RecentMessagesScreen}
                options={{
                    headerRight: () => (
                        <Icon name="search" size={20} color="black" onPress={() => navigation.navigate('SearchContacts')} />
                    ),
                    title: 'Recent Messages'
                }}
            />
            <Stack.Screen
                name="SearchContacts"
                component={SearchContactsScreen}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
            />
        </Stack.Navigator>
    );
}

export default ChatNavigator;
