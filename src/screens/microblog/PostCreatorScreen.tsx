import { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors, { Theme } from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import api from '../../utils/api';
import { createPost } from '../../redux/posts';
import ImagePicker from 'react-native-image-crop-picker';

interface Props {
    navigation: NativeStackNavigationProp<any>;
}

const PostCreatorScreen: React.FC<Props> = ({ navigation }) => {
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState(''); // base64
    const [imageName, setImageName] = useState('');

    const theme = useSelector((state: RootState) => state.theme);
    const { token } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();
    const styles = useMemo(() => styling(theme), [theme]);

    const publishPost = () => {
        if (text === '' && imageFile === '') return;

        api.post('/posts', {
            text,
            image: imageFile,
        }, token)
        .then((res: any) => {
            if (res.data.error) {
                Alert.alert('', res.data.message);
                return;
            }

            const post = res.data;
            dispatch(createPost({ post }));

            setText('');
            setImageFile('');
            setImageName('');

            navigation.navigate('Microblog');
        });
    }

    const openPicker = () => {
        ImagePicker.openPicker({
            includeBase64: true,
            mediaType: 'photo',
        })
        .then(image => {
            if (image.size > 10000000) {
                Alert.alert('The image cannot be larger than 10MB.');
            }

            const NAME_LENGTH = 15;
            const name = image.path.split('/').pop() as string;

            if (name.length > NAME_LENGTH) {
                const ext = name.split('.').pop() as string;
                const nameWithoutExt = name.substring(0, name.length - 4);
                const firstPart = nameWithoutExt.substring(0, NAME_LENGTH - 4);
                const lastPart = nameWithoutExt.substring(nameWithoutExt.length - 4, nameWithoutExt.length + 1);
                setImageName(firstPart + '...' + lastPart + '.' + ext);
            } else {
                setImageName(name);
            }

            setImageFile(image.data || '');
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
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={openPicker}>
                                    <Icon name="image" size={26} />
                                </TouchableOpacity>
                                <Text style={{ marginLeft: 10 }}>{imageName}</Text>
                            </View>
                            
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
        justifyContent: 'space-between',
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
