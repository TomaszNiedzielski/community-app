import { useMemo } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import Colors, { Theme } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface Props {
    url?: string;
    name?: string;
    small?: boolean;
    style?: any;
}

const Avatar: React.FC<Props> = ({ url, name, small, style }) => {
    const theme = useSelector((state: RootState) => state.theme);
    const styles = useMemo(() => styling(theme), [theme]);

    return (
        <>
        {url ? <Image
            source={{ uri: url }}
            style={[styles.avatar, small ? styles.small : {}, style]}
        /> : (name ? <Text style={[styles.avatar, styles.avatarLetter, small ? styles.small: {}, style]}>{name[0]}</Text> : null)}
        </>
    );
}

const styling = (theme: Theme) => StyleSheet.create({
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: Colors[theme].primary,
        color: Colors[theme].black,
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
