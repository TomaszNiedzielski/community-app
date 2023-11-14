import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch } from 'react-redux';
import Colors from '../../../constants/Colors';
import { PostProps } from '../../../redux/posts';
import { openSheet } from '../../../redux/sheet';

interface Props {
    postId: PostProps['id'];
}

const ManageButton: React.FC<Props> = ({ postId }) => {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            hitSlop={styles.hitSlop}
            onPress={() => {
                dispatch(openSheet({ value: true, name: 'PostManager', data: { postId } }));
            }}
            style={{ marginTop: 5 }}
        >
            <Icon name="dots-three-vertical" size={14} color={Colors.gray} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    hitSlop: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    }
});

export default ManageButton;
