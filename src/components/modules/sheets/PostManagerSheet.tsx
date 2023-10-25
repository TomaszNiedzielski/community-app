import Option from './Option';
import { BottomSheetContentProps } from './BottomSheetContainer';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../../redux/posts';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store';
import { closeSheet } from '../../../redux/sheet';

const PostManagerSheet: React.FC<BottomSheetContentProps> = ({ setSnapPoints, data }) => {
    const { token } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    useEffect(() => {
        setSnapPoints([100, 100]);
    }, []);

    const onPostDelete = () => {
        Alert.alert('Delete post', 'Are you sure you want to delete this post?', [
            {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    dispatch(deletePost({ id: data.postId, token }));
                    dispatch(closeSheet());
                }
            },
        ]);
    }

    return (
        <Option
            title="Delete"
            type="danger"
            onPress={onPostDelete}
        />
    );
}

export default PostManagerSheet;
