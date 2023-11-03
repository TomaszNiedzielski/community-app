import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import api, { ApiResponse } from '../../utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Contact, { Props as ContactProps } from '../../components/modules/chat/Contact';

const RecentMessagesScreen: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.user);
    const [contacts, setContacts] = useState<ContactProps[]>([]);

    useEffect(() => {
        api.get('contacts', token)
        .then((res: ApiResponse) => {
            setContacts(res.data);
        })
    }, []);

    return (
        <PrimaryContainer style={styles.container}>
            <FlatList
                data={contacts}
                renderItem={({ item }) => <Contact {...item} />}
            />
        </PrimaryContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
});

export default RecentMessagesScreen;
