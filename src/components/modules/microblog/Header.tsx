import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../../constants/Colors';
import { RootState } from '../../../redux/store';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const Header: React.FC = () => {
    const { name, token, avatar } = useSelector((state: RootState) => state.user);
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Microblog</Text>
            <View style={styles.auth}>
                {token && <Pressable
                    onPress={() => {
                        // dispatch(setBottomSheetVisibility({ value: true, componentName: 'UserManagerSheet' }))
                    }}
                >
                    {avatar && avatar.url ? <Image
                        source={{ uri: avatar.url }}
                        style={styles.avatar}
                    /> : <Text style={styles.avatar}>{name[0]}</Text>}
                </Pressable>}
                
                {!token && <Icon
                    name="login"
                    size={25}
                    color="#fff"
                    onPress={() => navigation.navigate('Login')}
                />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    auth: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 26,
        fontFamily: 'Inter-Bold',
    },
    avatar: {
        height: 34,
        width: 34,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: Colors.primary,
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        borderWidth: 1,
        borderColor: '#fff',
    },
    icon: {
        marginLeft: 16
    }
});

export default Header;
