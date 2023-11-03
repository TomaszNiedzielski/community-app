import { View, StyleSheet, Text } from 'react-native';
import Avatar from '../microblog/Avatar';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export interface Props {
    avatar: string;
    name: string;
    channelToken: string;
    lastMessage?: {
        userId: number;
        text: string;
        createdAt: string;
    };    
}

const Contact: React.FC<Props> = ({ avatar, name, channelToken, lastMessage }) => {
    const navigation = useNavigation<any>();
    const userId = useSelector((state: RootState) => state.user.id);
    
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', { channelToken, avatar, name })}>
            <View style={styles.container}>
                <Avatar
                    url={avatar}
                    name={name}
                    style={{
                        height: 50,
                        width: 50,
                    }}
                />
                <View style={styles.rightSide}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.lastMessage}>{lastMessage?.userId === userId ? 'You: ' : ''} {lastMessage?.text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginVertical: 10,
    },
    rightSide: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    name: {
        color: '#000',
        fontSize: 17
    },
    lastMessage: {
        color: '#000',
    }
});

export default Contact;
