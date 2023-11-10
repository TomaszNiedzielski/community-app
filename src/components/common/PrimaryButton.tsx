import { View, Text, TouchableNativeFeedback, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
    title: string;
    onPress?: () => void;
    style?: ViewStyle;
    isLoading?: boolean;
}

const PrimaryButton: React.FC<Props> = ({ title, onPress, style, isLoading }) => {
    return (
        <View style={[styles.container, style]}>
            <TouchableNativeFeedback
                onPress={onPress}
                background={TouchableNativeFeedback.Ripple('#000000', true)}
                disabled={isLoading}
            >
                <View style={styles.content}>
                    {!isLoading ? <Text style={styles.title}>{title}</Text>
                    : <ActivityIndicator color="#fff" />}
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 65,
        width: 255,
        borderRadius: 10,
        backgroundColor: Colors.primary,
    },
    content: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    }
});

export default PrimaryButton;
