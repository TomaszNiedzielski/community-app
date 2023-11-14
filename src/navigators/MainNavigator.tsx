import { useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MicroblogNavigator from './MicroblogNavigator';
import Icon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import UserNavigator from './UserNavigator';
import PostCreatorScreen from '../screens/microblog/PostCreatorScreen';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
