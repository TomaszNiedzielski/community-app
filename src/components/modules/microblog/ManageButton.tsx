import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../../constants/Colors';
import { PostProps } from '../../../redux/posts';
import { RootState } from '../../../redux/store';
import { openSheet } from '../../../redux/sheet';

interface Props {
    postId: PostProps['id'];
}

const ManageButton: React.FC<Props> = ({ postId }) => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme);

    return (
        <TouchableOpacity
            hitSlop={styles.hitSlop}
            onPress={() => {
                dispatch(openSheet({ value: true, name: 'PostManager', data: { postId } }));
            }}
        >
            <Icon name="dots-three-vertical" size={14} color={Colors[theme].gray} />
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
