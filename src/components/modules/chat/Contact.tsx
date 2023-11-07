import { View, StyleSheet, Text } from 'react-native';
import Avatar from '../microblog/Avatar';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Colors from '../../../constants/Colors';
import dayjs from 'dayjs';

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

    const convertUTCDateToLocalDate = (createdAt: string) => {
        const date = new Date(createdAt);
        const localTimeZoneDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
        
        return dayjs(localTimeZoneDate).fromNow();
    }
    
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
                    {lastMessage &&
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        <Text>{lastMessage.userId === userId ? 'You: ' : ''} </Text>
                        <Text style={{ width: 100 }}>{lastMessage.text.slice(0, 10)}{lastMessage.text.length > 10 ? '...' : ''} • </Text>
                        <Text>{convertUTCDateToLocalDate(lastMessage.createdAt)}</Text>
                    </Text>}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 6,
        padding: 10
    },
    rightSide: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    name: {
        color: Colors.white,
        fontSize: 17
    },
    lastMessage: {
        color: Colors.lightGray,
        fontSize: 13,
    }
});

export default Contact;
