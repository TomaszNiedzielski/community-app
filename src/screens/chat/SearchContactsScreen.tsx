import { useCallback, useRef, useState, useEffect } from 'react'
import { TextInput, StyleSheet, Dimensions, TextInputProps, FlatList } from 'react-native';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api, { ApiResponse } from '../../utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ContactSearchResult from '../../components/modules/chat/ContactSearchResult';
import { Props as ContactSearchResultProps } from '../../components/modules/chat/ContactSearchResult';
import Colors from '../../constants/Colors';

const SearchInput: React.FC<TextInputProps> = (props) => {
    const inputRef = useRef<TextInput>(null);

    useFocusEffect(
        useCallback(() => {
            // When the screen is focused
            const focus = () => {
                setTimeout(() => {
                    inputRef?.current?.focus();
                }, 1);
            };
            focus();
            return focus;
        }, []),
    );

    return (
        <TextInput
            style={styles.input}
            placeholder="Search for contacts..."
            placeholderTextColor={Colors.white}
            ref={inputRef}
            {...props}
        />
    );
}

interface Props {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any>;
}

const SearchContactsScreen: React.FC<Props> = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<ContactSearchResultProps[]>([]);

    const { token } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <SearchInput
                onChangeText={setSearch}
            />
        });
    }, []);

    useEffect(() => {
        if (search) {
            api.get('/contacts/search/' + search, token)
            .then((res: ApiResponse) => {
                setSearchResults(res.data);
            });
        }
    }, [search]);

    return (
        <PrimaryContainer style={styles.container}>
            <FlatList
                data={searchResults}
                renderItem={({ item }) => <ContactSearchResult {...item} />}
                keyboardShouldPersistTaps="always"
            />
        </PrimaryContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        width: Dimensions.get('screen').width - 70,
        color: Colors.white,
    }
});

export default SearchContactsScreen;
