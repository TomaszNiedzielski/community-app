import { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors, { Theme } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface Props {
    onPress: () => void;
    isLiked: boolean;
    likesCount: number;
}

const LikeButton: React.FC<Props> = ({ onPress, isLiked, likesCount }) => {
    const theme = useSelector((state: RootState) => state.theme);
    const styles = useMemo(() => styling(theme), [theme]);

    return (
        <View style={styles.container}>
            <Text style={styles.likes}>{likesCount}</Text>
            <TouchableOpacity onPress={onPress} hitSlop={styles.hitSlop}>
                <Icon name={isLiked ? 'heart' : 'hearto'} size={22} color={Colors[theme].primary} />
            </TouchableOpacity>
        </View>
    );
}

const styling = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    likes: {
        color: Colors[theme].primary,
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
