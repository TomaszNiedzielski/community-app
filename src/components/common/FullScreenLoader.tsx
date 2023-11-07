import { View, Modal, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

interface Props {
    visible: boolean;
}

const FullScreenLoader: React.FC<Props> = ({ visible }) => {
    return (
        <Modal
            visible={visible}
            transparent
        >
            <StatusBar
                backgroundColor={styles.container.backgroundColor}
            />
            <View style={styles.container}>
                <ActivityIndicator color="white" size={26} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: .7,
        backgroundColor: '#000',
        justifyContent: 'center',
    }
});

export default FullScreenLoader;
