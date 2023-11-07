import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import Avatar from '../microblog/Avatar';
import { useNavigation } from '@react-navigation/native';
import api, { ApiResponse } from '../../../utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Colors from '../../../constants/Colors';

export interface Props {
    name: string;
    avatar: string;
    channelToken?: string;
    userId: number;
}

const ContactSearchResult: React.FC<Props> = ({ avatar, name, channelToken, userId }) => {
    const navigation = useNavigation<any>();
    const { token } = useSelector((state: RootState) => state.user);

    const navigateToChat = () => {
        if (!channelToken) {
            // Create channel
            api.post('channels', { userId }, token)
            .then((res: ApiResponse) => {
                if (res.data.channelToken) {
                    navigation.navigate('Chat', {
                        channelToken: res.data.channelToken,
                        avatar,
                        name
                    });
                }
            });
        } else {
            navigation.navigate('Chat', { channelToken, avatar, name });
        }
    }

    return (
        <TouchableOpacity onPress={navigateToChat}>
            <View style={styles.container}>
                <Avatar
                    url={avatar}
                    name={name}
                />
                <Text style={styles.name}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    name: {
        marginLeft: 10,
        fontSize: 16,
        color: Colors.white,
    }
});

export default ContactSearchResult;
