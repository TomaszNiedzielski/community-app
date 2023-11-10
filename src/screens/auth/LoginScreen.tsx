import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Platform, Text } from 'react-native';
import PrimaryButton from '../../components/common/PrimaryButton';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import DeviceInfo from 'react-native-device-info';
import { storeUser } from '../../storage/user';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/user';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../redux/store';
// import { showMessage } from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
import api, { ApiError, ApiResponse } from '../../utils/api';
import { styles } from './RegisterScreen';
import FormInput from '../../components/common/FormInput';

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

        // Check internet connection
        const netState = await NetInfo.fetch();
        if (!netState.isConnected) {
            // showMessage({
            //     message: 'You have no internet connection.',
            //     type: 'danger',
            //     icon: 'auto',
            //     duration: 2500
            // });
        }

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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ paddingBottom: 50 }}>
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
                            title="Login"
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
                </ScrollView>
            </KeyboardAvoidingView>
        </PrimaryContainer>
    );
}

export default LoginScreen;
