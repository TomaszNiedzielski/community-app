import { Text, StyleSheet } from 'react-native';
import PrimaryContainer from '../components/common/PrimaryContainer';
import Colors from '../constants/Colors';

const NotificationsScreen: React.FC = () => {
    return (
        <PrimaryContainer>
            <Text style={styles.title}>No notifications found!</Text>
        </PrimaryContainer>
    );
}

const styles = StyleSheet.create({
    title: {
        color: Colors.gray,
        textAlign: 'center',
        paddingVertical: 30
    }
});

export default NotificationsScreen;
