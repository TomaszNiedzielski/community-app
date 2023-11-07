import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MicroblogNavigator from './MicroblogNavigator';
import ChatNavigator from './ChatNavigator';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import UserNavigator from './UserNavigator';

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarInactiveBackgroundColor: Colors.slightlyDark,
                tabBarActiveBackgroundColor: Colors.slightlyDark,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="MicroblogNavigator"
                component={MicroblogNavigator}
                options={{
                    headerShown: false,
                    title: 'Microblog',
                    tabBarIcon: ({ focused }) => <Icon name="home" size={20} color={focused ? Colors.primary : Colors.lightGray} />,
                }}
            />
            <Tab.Screen
                name="ChatNavigator"
                component={ChatNavigator}
                options={{
                    headerShown: false,
                    title: 'Chat',
                    tabBarIcon: ({ focused }) => <MaterialCommunityIconsIcon name="chat" size={20} color={focused ? Colors.primary : Colors.lightGray} />,
                }}
            />
            <Tab.Screen
                name="UserNavigator"
                component={UserNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon name="user" size={20} color={focused ? Colors.primary : Colors.lightGray} />,
                }}
            />
        </Tab.Navigator>
    );
}

export default MainNavigator;
