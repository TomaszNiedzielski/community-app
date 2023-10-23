import { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors, { Theme } from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import api from '../../utils/api';
import { createPost } from '../../redux/posts';

interface Props {
    navigation: NativeStackNavigationProp<any>;
}

const PostCreatorScreen: React.FC<Props> = ({ navigation }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(''); // base64

    const theme = useSelector((state: RootState) => state.theme);
    const { token } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();
    const styles = useMemo(() => styling(theme), [theme]);

    const publishPost = () => {
        if (text === '' && image === '') return;

        api.post('/posts', {
            text,
            image,
        }, token)
        .then((res: any) => {
            if (res.data.error) {
                Alert.alert('', res.data.message);
                return;
            }

            const post = res.data;
            dispatch(createPost({ post }));

            setText('');
            setImage('');

            navigation.navigate('Microblog');
        });
    }

    return (
        <PrimaryContainer>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Create post</Text>
                        <Icon name="close" size={36} color={Colors[theme].black} onPress={() => navigation.goBack()} style={styles.close} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <KeyboardAwareScrollView extraHeight={50}>
                            <TextInput
                                placeholder="What's on your mind?"
                                style={styles.textInput}
                                multiline
                                onChangeText={txt => setText(txt)}
                                value={text}
                            />
                        </KeyboardAwareScrollView>
                        <View style={styles.footer}>
                            <TouchableOpacity onPress={publishPost}>
                                <Text style={styles.publish}>Publish</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </PrimaryContainer>
    );
}

const styling = (theme: Theme) => StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    title: {
        fontSize: 30,
        color: Colors[theme].black,
        fontWeight: 'bold'
    },
    close: {
        padding: 10
    },
    textInput: {
        fontSize: 26,
        padding: 16,
    },
    footer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    publish: {
        color: Colors[theme].black
    }
});

export default PostCreatorScreen;
