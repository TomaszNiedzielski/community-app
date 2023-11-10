import { useEffect } from 'react';
import { Alert } from 'react-native';
import Option from './Option';
import { BottomSheetContentProps } from './BottomSheetContainer';
import { useDispatch } from 'react-redux';
import { closeSheet } from '../../../redux/sheet';
import { logoutUser } from '../../../storage/user';

const UserSettingsSheet: React.FC<BottomSheetContentProps> = ({ setSnapPoints }) => {
    const dispatch = useDispatch<any>();

    useEffect(() => {
        setSnapPoints([100, 100]);
    }, []);

    const onLogout = () => {
        Alert.alert('Are you sure you want to logout?', '', [
            {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    logoutUser();
                    dispatch(closeSheet());
                }
            },
        ]);
    }

    return (
        <Option
            title="Logout"
            type="danger"
            onPress={onLogout}
        />
    );
}

export default UserSettingsSheet;
