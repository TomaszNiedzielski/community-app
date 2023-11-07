import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    Bubble,
    BubbleProps,
    Composer,
    ComposerProps,
    GiftedChat,
    IMessage,
    InputToolbar,
    InputToolbarProps,
    Send,
    SendProps,
} from 'react-native-gifted-chat';
import Colors from '../../../constants/Colors';
import NetInfoAlert from '../../common/NetInfoAlert';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Pusher, PusherEvent } from '@pusher/pusher-websocket-react-native';
import api, { ApiResponse } from '../../../utils/api';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    channelToken: string;
}

const Chat: React.FC<Props> = ({ channelToken }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const { id: userId, token } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchMessages = async () => {
            api.get(`/messages?channelToken=${channelToken}`, token)
            .then((res: ApiResponse) => {
                if (res.data.messages) {
                    setMessages(res.data.messages);
                }
            });
        }

        fetchMessages();
    }, []);

    useEffect(() => {
        const subscribePusher = async () => {
            const pusher = Pusher.getInstance();

            await pusher.init({
                apiKey: '255f0406ab7299cb428c',
                cluster: 'eu'
            });
            
            await pusher.connect();
            await pusher.subscribe({
                channelName: channelToken, 
                onEvent: (event: PusherEvent) => {
                    const data = event.data;
                    const parsedData = JSON.parse(data);
                    const message = parsedData.message;

                    if (message.user._id !== userId) {
                        setMessages(previousMessages => GiftedChat.append(previousMessages, [message]));
                    }
                }
            });
        }

        if (channelToken) {
            subscribePusher();
        }
    }, [channelToken]);

    const onSend = useCallback((messages: IMessage[] = []) => {
        api.post('/messages', {
            text: messages[0].text,
            channelToken: channelToken
        }, token);

        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    }, [channelToken]);

    const renderComposer = (props: ComposerProps) => {
        return (
            <Composer
                {...props}
                textInputStyle={{
                    borderRadius: 30,
                    backgroundColor: '#eee',
                    paddingHorizontal: 16,
                    marginRight: props.text ? 0 : 10,
                    marginBottom: 10,
                    color: '#000',
                }}
                multiline 
            />
        );
    }

    const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: 'transparent',
                    borderTopWidth: 0
                }}
            />
        );
    }

    const renderSend = (props: SendProps<any>) => {
        return (
            <Send {...props}>
                <Icon
                    name="send"
                    size={26}
                    color={Colors.primary}
                    style={{
                        height: 26,
                        width: 26,
                        marginBottom: 22,
                        marginRight: 10,
                        marginLeft: 10
                    }}
                />
            </Send>
        );
    }

    const renderBubble = (props: BubbleProps<any>) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {},
                    right: {
                        backgroundColor: Colors.primary
                    }
                }}
            />
        );
    }

    const renderChatEmpty = () => {
        return (
            <View style={styles.chatEmptyContainer}>
                <Text style={{
                    color: '#fff',
                    fontSize: 16,
                    marginBottom: 10
                }}>Send first message!</Text>
            </View>
        );
    }

    return (
        <>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userId,
                }}
                renderComposer={renderComposer}
                renderInputToolbar={renderInputToolbar}
                listViewProps={{
                    marginBottom: 30
                }}
                renderSend={renderSend}
                minComposerHeight={50}
                renderBubble={renderBubble}
                renderChatEmpty={renderChatEmpty}
                messagesContainerStyle={messages?.length == 0 && {transform: [{scaleX: -1}]}}
            />
            <NetInfoAlert />
        </>
    );
}

const styles = StyleSheet.create({
    chatEmptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scaleY: -1 }],
        paddingHorizontal: 30
    },
    name: {
        color: '#fff',
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default Chat;
