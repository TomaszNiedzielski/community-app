import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MicroblogNavigator from './MicroblogNavigator';
import UserScreen from '../screens/user/UserScreen';
import ChatNavigator from './ChatNavigator';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="MicroblogNavigator"
                component={MicroblogNavigator}
                options={{
                    headerShown: false,
                    title: 'Microblog',
                    tabBarIcon: ({ focused }) => <Icon name="home" size={20} color={focused ? '#000' : 'gray'} />,
                    tabBarActiveTintColor: '#000',
                }}
            />
            <Tab.Screen
                name="ChatNavigator"
                component={ChatNavigator}
                options={{
                    headerShown: false,
                    title: 'Chat',
                    tabBarIcon: ({ focused }) => <MaterialCommunityIconsIcon name="chat" size={20} color={focused ? '#000' : 'gray'} />,
                    tabBarActiveTintColor: '#000',
                }}
            />
            <Tab.Screen
                name="User"
                component={UserScreen}
                options={{
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon name="user" size={20} color={focused ? '#000' : 'gray'} />,
                    tabBarActiveTintColor: '#000',
                }}
            />
        </Tab.Navigator>
    );
}

export default MainNavigator;
