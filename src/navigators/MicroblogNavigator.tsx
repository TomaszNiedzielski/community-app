import { useLayoutEffect } from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import MicroblogScreen from '../screens/microblog/MicroblogScreen';
import PostScreen from '../screens/microblog/PostScreen';
import PostCreatorScreen from '../screens/microblog/PostCreatorScreen';

const Stack = createNativeStackNavigator();

interface Props {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any>;
}

const MicroblogNavigator: React.FC<Props> = ({ route, navigation }) => {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'Post' || routeName === 'PostCreator') {
            navigation.setOptions({ tabBarStyle: { display: 'none' } } as any);
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } } as any);
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Microblog"
                component={MicroblogScreen}
            />
            <Stack.Screen
                name="Post"
                component={PostScreen}
            />
            <Stack.Screen
                name="PostCreator"
                component={PostCreatorScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default MicroblogNavigator;
