import { Image, StyleSheet, Text } from 'react-native';
import Colors from '../../../constants/Colors';

interface Props {
    url?: string;
    name?: string;
    small?: boolean;
    style?: any;
}

const Avatar: React.FC<Props> = ({ url, name, small, style }) => {
    return (
        <>
        {url ? <Image
            source={{ uri: url }}
            style={[styles.avatar, small ? styles.small : {}, style]}
        /> : (name ? <Text style={[styles.avatar, styles.avatarLetter, small ? styles.small: {}, style]}>{name[0]}</Text> : null)}
        </>
    );
}

const styles = StyleSheet.create({
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: Colors.primary,
        color: Colors.black,
        fontSize: 22,
        fontFamily: 'Inter-Bold',
    },
    avatarLetter: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    small: {
        height: 36,
        width: 36,
        fontSize: 19,
    },
});

export default Avatar;
