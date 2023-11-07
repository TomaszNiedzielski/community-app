import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Avatar from '../microblog/Avatar';
import Colors from '../../../constants/Colors';

interface Props {
    name: string;
    avatar: string;
}

const ChatHeader: React.FC<Props> = ({ name, avatar }) => {
    return (
        <View style={styles.container}>
            <Avatar
                url={avatar}
                name={name}
                small
            />
            <Text style={styles.name}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('screen').width - 70
    },
    name: {
        color: Colors.white,
        marginLeft: 12,
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default ChatHeader;
