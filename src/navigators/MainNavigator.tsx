import { useEffect, useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MicroblogNavigator from './MicroblogNavigator';
import Icon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import UserNavigator from './UserNavigator';
import PostCreatorScreen from '../screens/microblog/PostCreatorScreen';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ChatNavigator from './ChatNavigator';
import NotificationsScreen from '../screens/NotificationsScreen';
import messaging from '@react-native-firebase/messaging';

interface Props {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any>;
}

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC<Props> = ({ route, navigation }) => {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'PostCreator') {
            StatusBar.setBackgroundColor(Colors.slightlyDark);
        } else {
            StatusBar.setBackgroundColor(Colors.dark);
        }
    }, [navigation, route]);

    useEffect(() => {
        messaging().onNotificationOpenedApp((message: any) => {
            const action = JSON.parse(message.data.action);

            if (action.name === 'OPEN_CHAT_SCREEN') {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Home',
                            state: {
                                routes: [
                                    {
                                        name: 'ChatNavigator',
                                        state: {
                                            routes: [
                                                {
                                                    name: 'RecentMessages',
                                                },
                                                {
                                                    name: 'Chat',
                                                    params: action.params
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                });
            }
        });
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarInactiveBackgroundColor: Colors.dark,
                tabBarActiveBackgroundColor: Colors.dark,
                tabBarActiveTintColor: Colors.gray,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="MicroblogNavigator"
                component={MicroblogNavigator}
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ focused }) => <Icon name="home" size={20} color={focused ? Colors.lightGray : Colors.gray} />,
                }}
            />
            <Tab.Screen
                name="ChatNavigator"
                component={ChatNavigator}
                options={{
                    headerShown: false,
                    title: 'Chat',
                    tabBarIcon: ({ focused }) => <Icon name="chat" size={20} color={focused ? Colors.lightGray : Colors.gray} />,
                }}
            />
            <Tab.Screen
                name="PostCreator"
                component={PostCreatorScreen}
                options={{
                    headerShown: false,
                    title: 'Create Post',
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon name="plus" size={30} color={Colors.gold} />,
                    tabBarStyle: {
                        display: 'none'
                    }
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    tabBarIcon: ({ focused }) => <IoniconsIcon name="notifications" size={20} color={focused ? Colors.lightGray : Colors.gray} />,
                    headerStyle: {
                        backgroundColor: Colors.dark,
                    },
                    headerTintColor: Colors.white
                }}
            />
            <Tab.Screen
                name="UserNavigator"
                component={UserNavigator}
                options={{
                    headerShown: false,
                    title: 'User',
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon name="user" size={20} color={focused ? Colors.lightGray : Colors.gray} />,
                }}
            />
        </Tab.Navigator>
    );
}

export default MainNavigator;
