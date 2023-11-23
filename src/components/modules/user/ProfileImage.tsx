import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from '../microblog/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import ImagePicker from 'react-native-image-crop-picker';
import { updateAvatar } from '../../../redux/user';

const ProfileImage: React.FC = () => {
    const { name, avatar, token } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<any>();

    const handleAvatarChange = async () => {
        const selectedImage = await ImagePicker.openPicker({
            mediaType: 'photo',
        });

        ImagePicker.openCropper({
            path: selectedImage.path,
            width: 144,
            height: 144,
            mediaType: 'photo',
            includeBase64: true,
        })
        .then(image => {
            if (image.data) {
                dispatch(updateAvatar({ avatar: image.data, token }));
            }
        });
    }

    return (
        <View>
            <TouchableOpacity onPress={handleAvatarChange}>
                <Avatar
                    name={name}
                    url={avatar.url}
                    style={styles.image}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        fontSize: 70
    },
});

export default ProfileImage;
