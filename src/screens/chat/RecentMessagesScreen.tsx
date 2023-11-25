import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import api, { ApiResponse } from '../../utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Contact, { Props as ContactProps } from '../../components/modules/chat/Contact';
import { useFocusEffect } from '@react-navigation/native';
import NetInfoAlert from '../../components/common/NetInfoAlert';
import Colors from '../../constants/Colors';

const RecentMessagesScreen: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.user);
    const [contacts, setContacts] = useState<ContactProps[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchRecentMessages = () => {
        setIsRefreshing(true);

        api.get('contacts', token)
        .then((res: ApiResponse) => {
            setContacts(res.data);
        })
        .finally(() => setIsRefreshing(false));
    }

    useFocusEffect(
        useCallback(() => {
            fetchRecentMessages();
        }, []),
    );

    return (
        <PrimaryContainer style={styles.container}>
            {contacts.length ? <FlatList
                data={contacts}
                renderItem={({ item }) => <Contact {...item} />}
                onRefresh={fetchRecentMessages}
                refreshing={isRefreshing}
            /> : <Text style={styles.title}>No messages!</Text>}
            <NetInfoAlert />
        </PrimaryContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        color: Colors.gray,
        textAlign: 'center',
        paddingVertical: 30,
    }
});

export default RecentMessagesScreen;
