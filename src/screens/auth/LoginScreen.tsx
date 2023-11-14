import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import PrimaryButton from '../../components/common/PrimaryButton';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import DeviceInfo from 'react-native-device-info';
import { storeUser } from '../../storage/user';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/user';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../redux/store';
import api, { ApiError, ApiResponse, showErrors } from '../../utils/api';
import { styles } from './RegisterScreen';
import FormInput from '../../components/common/FormInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
    navigation: NativeStackNavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (token) {
            navigation.replace('Home');
        }
    }, [token]);

    const onSubmit = async () => {
        if (!email) {
            setEmailError('Email is required.');
            return;
        }
        if (!password) {
            setPasswordError('Password is required.');
            return;
        }

        setEmailError('');
        setPasswordError('');
        setIsLoading(true);

        // Device name for token session
        const deviceName = await DeviceInfo.getDeviceName();

        api.post('/login', {
            email,
            password,
            deviceName,
        })
        .then((res: ApiResponse) => {
            const { data } = res;

            if (data.token) {
                storeUser(data);
                dispatch(setUser(data));
            }
        })
        .catch((err: ApiError) => {
            showErrors(err);

            const data: any = err.response?.data;
            const { email, password } = data.errors;
            setEmailError(email);
            setPasswordError(password);
        })
        .finally(() => setIsLoading(false));
    }

    useEffect(() => setEmailError(''), [email]);
    useEffect(() => setPasswordError(''), [password]);

    return (
        <PrimaryContainer>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
                <View style={styles.container}>
                    <FormInput
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Type email..."
                        style={styles.input}
                        errorMessage={emailError}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        label="Email"
                    />
                    <FormInput
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Type password..."
                        style={styles.input}
                        errorMessage={passwordError}
                        secureTextEntry
                        label="Password"
                    />
                    <PrimaryButton
                        title="Log In"
                        style={styles.btn}
                        onPress={onSubmit}
                        isLoading={isLoading}
                    />
                    <Text style={styles.btnLoginText}>New here?</Text>
                    <PrimaryButton
                        title="Sign up"
                        style={styles.btnLogin}
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </KeyboardAwareScrollView>
        </PrimaryContainer>
    );
}

export default LoginScreen;
