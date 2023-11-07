import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
    children: React.ReactNode;
    style?: ViewStyle;
    statusBarColor?: string;
}

const PrimaryContainer: React.FC<Props> = ({ children, style, statusBarColor }) => {
    // useFocusEffect(useCallback(() => {
        // StatusBar.setBackgroundColor(statusBarColor || Colors.dark);
    // }, []));

    return (
        <SafeAreaView style={[styles.container, style]}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark,
    }
});

export default PrimaryContainer;
