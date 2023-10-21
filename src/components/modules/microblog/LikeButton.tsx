import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
    onPress: () => void;
    isLiked: boolean;
    likesCount: number;
}

const LikeButton: React.FC<Props> = ({ onPress, isLiked, likesCount }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.likes}>{likesCount}</Text>
            <TouchableOpacity onPress={onPress} hitSlop={styles.hitSlop}>
                <Icon name={isLiked ? 'heart' : 'hearto'} size={22} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    likes: {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 12,
        fontSize: 13
    },
    hitSlop: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    }
});

export default LikeButton;
