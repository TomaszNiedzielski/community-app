import { View, Image, StyleSheet } from 'react-native';

const ProfileImage: React.FC = () => {
    return (
        <View>
            <Image
                source={{ uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais' }}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
    },
});

export default ProfileImage;
