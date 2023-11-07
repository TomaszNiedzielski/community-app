import { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PrimaryContainer from '../../components/common/PrimaryContainer';
import api, { ApiResponse } from '../../utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Contact, { Props as ContactProps } from '../../components/modules/chat/Contact';
import { useFocusEffect } from '@react-navigation/native';

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
            <FlatList
                data={contacts}
                renderItem={({ item }) => <Contact {...item} />}
                onRefresh={fetchRecentMessages}
                refreshing={isRefreshing}
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
