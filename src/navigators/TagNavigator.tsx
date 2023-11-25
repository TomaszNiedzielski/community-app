import { createDrawerNavigator } from '@react-navigation/drawer';
import MicroblogScreen from '../screens/microblog/MicroblogScreen';
import { tags } from '../components/modules/postCreator/TagSelector';
import Colors from '../constants/Colors';

const Drawer = createDrawerNavigator();

const TagNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.dark,
                },
                headerTintColor: Colors.white,
                drawerStyle: {
                    backgroundColor: Colors.dark,
                    paddingTop: 10
                },
                drawerActiveTintColor: Colors.white,
                drawerInactiveTintColor: Colors.gray,
            }}
        >
            <Drawer.Screen name="MicroblogHome" component={MicroblogScreen} options={{ title: 'Home' }} />
            {tags.map(tag => (
                <Drawer.Screen name={tag} component={MicroblogScreen} />
            ))}
        </Drawer.Navigator>
    );
}

export default TagNavigator;
