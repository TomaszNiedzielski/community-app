import { useEffect } from 'react';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import Chat from '../../components/modules/chat/Chat';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import ChatHeader from '../../components/modules/chat/ChatHeader';

interface Props {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any>;
}

const ChatScreen: React.FC<Props> = ({ navigation, route }) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ChatHeader
                    name={route.params?.name}
                    avatar={route.params?.avatar}
                />
            ),
            title: '',
        });
    }, [route.params]);

    return (
        <PrimaryContainer>
            <Chat
                channelToken={route.params?.channelToken}
            />
        </PrimaryContainer>
    );
}

export default ChatScreen;
