import { Pressable, Text, StyleSheet } from 'react-native';

interface Props {
    title: string;
    onPress?: () => void;
    type?: 'default' | 'danger';
}

const Option: React.FC<Props> = ({ title, onPress, type }) => (
    <Pressable onPress={onPress}>
        <Text style={[styles.title, {
            color: type === 'danger' && '#FF0101' || '#5B7EF6'
        }]}>{title}</Text>
    </Pressable>
);

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Inter-Bold',
        marginVertical: 10,
        width: '100%',
        textAlign: 'center',
        height: 40,
        textAlignVertical: 'center',
        fontWeight: 'bold',
    },
});

export default Option;
