import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, StyleSheet, Text } from 'react-native';
import PrimaryButton from '../../components/common/PrimaryButton';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import FormInput from '../../components/common/FormInput';
import { storeUser } from '../../storage/user';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/user';
import DeviceInfo from 'react-native-device-info';
import { RootState } from '../../redux/store';
import api, { ApiError, ApiResponse, showErrors } from '../../utils/api';
import { validateName } from '../../utils/validations';
import Colors from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
    navigation: NativeStackNavigationProp<any>;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
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
        const nameValidation = validateName(name);
        if (nameValidation) {
            setNameError(nameValidation);
            return;
        }
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

        const deviceName = await DeviceInfo.getDeviceName();

        api.post('/register', {
            name,
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
            const { name, email, password } = data.errors;
            setNameError(name);
            setEmailError(email);
            setPasswordError(password);
        })
        .finally(() => setIsLoading(false));
    }

    useEffect(() => setNameError(''), [name]);
    useEffect(() => setEmailError(''), [email]);
    useEffect(() => setPasswordError(''), [password]);

    return (
        <PrimaryContainer>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
                <View style={styles.container}>
                    <FormInput
                        onChangeText={setName}
                        value={name}
                        placeholder="Type name..."
                        style={styles.input}
                        errorMessage={nameError}
                        label="Name"
                        autoCapitalize="none"
                    />
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
                        title="Sign Up"
                        style={styles.btn}
                        onPress={onSubmit}
                        isLoading={isLoading}
                    />
                    <Text style={styles.btnLoginText}>Already have an account?</Text>
                    <PrimaryButton
                        title="Log In"
                        style={styles.btnLogin}
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
            </KeyboardAwareScrollView>
        </PrimaryContainer>
    );
}

export const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    input: {
        marginTop: 20
    },
    btn: {
        alignSelf: 'center',
        marginTop: 30
    },
    btnLoginText: {
        color: Colors.white,
        alignSelf: 'center',
        marginTop: 30,
        fontSize: 13
    },
    btnLogin: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        alignSelf: 'center',
        height: 50,
        marginTop: 10,
        width: 100
    }
});

export default RegisterScreen;
