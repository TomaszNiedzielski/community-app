import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MicroblogNavigator from './MicroblogNavigator';
import PostCreatorScreen from '../screens/microblog/PostCreatorScreen';
import UserScreen from '../screens/user/UserScreen';

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="MicroblogNavigator"
                component={MicroblogNavigator}
            />
            <Tab.Screen
                name="PostCreator"
                component={PostCreatorScreen}
            />
            <Tab.Screen
                name="User"
                component={UserScreen}
            />
        </Tab.Navigator>
    );
}

export default MainNavigator;
