import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const storeDeviceId = async () => {
    const deviceId = uuidv4();
    await AsyncStorage.setItem('device_id', deviceId);
    return deviceId;
}

export const getDeviceId = async () => {
    let deviceId = await AsyncStorage.getItem('device_id');

    if (!deviceId) {
        deviceId = await storeDeviceId();
        return deviceId;
    }

    return deviceId;
}
