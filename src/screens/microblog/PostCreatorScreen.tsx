import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api, { ApiError, ApiResponse, showErrors } from '../../utils/api';
import { createPost } from '../../redux/posts';
import ImagePicker from 'react-native-image-crop-picker';
import FullScreenLoader from '../../components/common/FullScreenLoader';

interface Props {
    navigation: NativeStackNavigationProp<any>;
}

const PostCreatorScreen: React.FC<Props> = ({ navigation }) => {
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState(''); // base64
    const [imageName, setImageName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { token } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const publishPost = () => {
        if (text === '' && imageFile === '') return;

        setIsLoading(true);

        api.post('/posts', {
            text,
            image: imageFile,
        }, token)
        .then((res: ApiResponse) => {
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
        })
        .catch((err: ApiError) => {
            showErrors(err);
        })
        .finally(() => setIsLoading(false));
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

    const rejectImage = () => {
        setImageFile('');
        setImageName('');
    }

    return (
        <PrimaryContainer style={styles.container}>
            <FullScreenLoader visible={isLoading} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Create post</Text>
                        <Icon name="close" size={36} color={Colors.white} onPress={() => navigation.goBack()} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <KeyboardAwareScrollView extraHeight={50}>
                            <TextInput
                                placeholder="What's on your mind?"
                                style={styles.textInput}
                                multiline
                                onChangeText={txt => setText(txt)}
                                value={text}
                                placeholderTextColor={Colors.white}
                                cursorColor={Colors.white}
                            />
                        </KeyboardAwareScrollView>
                        {imageName ? <View style={styles.imageItem}>
                            <Text style={styles.imageName}>{imageName}</Text>
                            <Icon name="remove" color={Colors.red} size={26} onPress={rejectImage} />
                        </View> : null}
                        <View style={styles.footer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={openPicker}>
                                    <Icon name="image" size={26} color={Colors.white} />
                                </TouchableOpacity>
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.slightlyDark
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 20
    },
    title: {
        fontSize: 30,
        color: Colors.white,
        fontWeight: 'bold'
    },
    textInput: {
        fontSize: 24,
        padding: 16,
        color: Colors.white
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
        color: Colors.white,
        fontWeight: 'bold',
    },
    imageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center'
    },
    imageName: {
        color: Colors.white
    }
});

export default PostCreatorScreen;
