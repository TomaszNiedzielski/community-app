import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MicroblogScreen from '../screens/microblog/MicroblogScreen';
// import PostScreen from '../screens/microblog/PostScreen';

const Stack = createNativeStackNavigator();

const MicroblogNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Microblog"
                component={MicroblogScreen}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="Post"
                component={PostScreen}
            /> */}
        </Stack.Navigator>
    );
}

export default MicroblogNavigator;
