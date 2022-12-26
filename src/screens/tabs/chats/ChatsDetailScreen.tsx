import {useRoute} from '@react-navigation/native';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import dayjs from 'dayjs';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {DataShower} from '../../../base/components/DataShower';
import {Header} from '../../../base/components/Header';
import {Row} from '../../../base/components/Row';
import {Text} from '../../../base/components/Text';
import {useRootStore} from '../../../base/hooks/useRootStore';
import {isEmpty, isTrue} from '../../../base/utils/baseUtil';
import {Avatar} from '../../../components/Avatar';
import {BackButton} from '../../../components/BackButton';
import {DeleteIcon} from '../../../components/icons/DeleteIcon';
import {LeftArrowIcon} from '../../../components/icons/LeftArrowIcon';
import {RightArrowIcon} from '../../../components/icons/RightArrowIcon';
import {SendIcon} from '../../../components/icons/SendIcon';
import {IconSize} from '../../../components/icons/types/Icon';
import {Keyboard} from '../../../components/Keyboard';
import {ChatTypes} from '../../../components/types/ChatTypes';
import ArrayHelper from '../../../helpers/ArrayHelper';
import ChatHelper from '../../../helpers/ChatHelper';
import {Message} from '../../../modules/message/models/Message';
import {ContactsDetailRouteProps} from '../../../navigation/types/ContactsStackTypes';
import {Colors} from '../../../styles/Colors';

export const ChatsDetailScreen = observer(() => {
  const {chatStore, messageStore, profileStore} = useRootStore();
  const {params} = useRoute<ContactsDetailRouteProps>();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedMessages, setSelectedMessages] = useState<Message['id'][]>([]);
  const [message, setMessage] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  const participants = useMemo(() => {
    if (chatStore.currentChat) {
      return ChatHelper.getParticipants(
        chatStore.currentChat.membersData,
        chatStore.currentChat.owner,
      );
    }

    return [];
  }, [chatStore.currentChat]);

  console.log('currentChat', chatStore.currentChat);

  const isPrivate = chatStore.currentChat?.type === ChatTypes.private;
  const chatName = isPrivate
    ? participants[0].displayName
    : chatStore.currentChat?.name ??
      participants.map(p => p.displayName).join(', ');

  useEffect(() => {
    const init = async () => {
      if (!chatStore.currentChat) {
        await chatStore.getCurrentChat(params.id);
      }

      messageStore.getMessages(chatStore.currentChat?.id!);

      return () => {
        messageStore.resetMessages();
      };
    };

    init();
  }, [params.id]);

  const handleMessageInputFocus = () => {
    setIsKeyboardVisible(true);
  };

  const handleMessageInputOutsidePress = () => {
    inputRef.current?.blur();
    setIsKeyboardVisible(false);
  };

  const handleKeyboardKeyPress = (value: string) => {
    switch (value) {
      case 'backspace': {
        setMessage([...message].slice(0, -1).join(''));
        break;
      }
      default:
        setMessage(message => message + value);
        break;
    }
  };

  const handleMessageLongPress = (message: Message['id']) => {
    if (!isEditMode) setIsEditMode(true);
    setSelectedMessages([message]);
  };

  const handleMessagePress = (message: Message['id']) => {
    if (selectedMessages.includes(message)) {
      setSelectedMessages(selectedMessages =>
        selectedMessages.filter(selectedMessage => selectedMessage !== message),
      );
    } else {
      setSelectedMessages(selectedMessages => [...selectedMessages, message]);
    }
  };

  const handleBackButtonPress = () => {
    if (isEditMode) setIsEditMode(false);
    setSelectedMessages([]);
  };

  const hadnleSendButtonPress = () => {
    if (profileStore.profile?.id && !isEmpty(message)) {
      Promise.all([
        messageStore.sendMessage(params.id, profileStore.profile.id, message),
        chatStore.setLastMessage(params.id, profileStore.profile.id, message),
        chatStore.incrementMessageCounters(params.id),
      ]).then(() => {
        setMessage('');
      });
    }
  };

  const handleReplyButtonPress = () => {
    if (isEditMode) setIsEditMode(false);
  };

  const handleDeleteButtonPress = async () => {
    if (isEditMode) setIsEditMode(false);
    await messageStore.deleteMessages(selectedMessages);
    if (profileStore.profile?.id) {
      chatStore.setLastMessage(
        params.id,
        profileStore.profile.id,
        ArrayHelper.last(messageStore.messages),
      );
      chatStore.decrementMessageCounters(params.id);
    }
    setSelectedMessages([]);
  };

  const handleForwardButtonPress = () => {
    if (isEditMode) setIsEditMode(false);
  };

  const renderMessage: ListRenderItem<Message> = ({item}) => {
    const isSent = !isTrue(
      participants.find(participant => participant.id === item.sender),
    );

    const lastOnline =
      chatStore.currentChat?.type === ChatTypes.private
        ? participants[0].lastOnline
        : null;

    return (
      <TouchableOpacity
        onLongPress={() => handleMessageLongPress(item.id)}
        onPress={() => handleMessagePress(item.id)}
        style={[
          styles.messageWrap,
          isSent && styles.sentMessageWrap,
          isEditMode &&
            selectedMessages.includes(item.id) &&
            styles.selectedMessageWrap,
        ]}>
        {!isEmpty(item.sentAt) && !isEmpty(lastOnline) && (
          <Text
            color={Colors.grey}
            fontSize={10}
            fontWeight={400}
            style={styles.messageTime}>
            {dayjs.unix(lastOnline!).format('hh:mm')}
          </Text>
        )}
        {!isEmpty(item.content) && (
          <View style={[styles.message, isSent && styles.setMessage]}>
            <Text>{item.content!}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftComponent={
          <BackButton
            onPress={isEditMode ? handleBackButtonPress : undefined}
          />
        }
        centerComponent={
          !isEditMode &&
          (chatStore.currentLoading || messageStore.loading ? (
            <Text color={Colors.white} fontSize={18} fontWeight={600}>
              Загрузка...
            </Text>
          ) : (
            <Row spacing={10}>
              <Avatar
                uri={
                  isPrivate
                    ? participants[0].photoURL
                    : chatStore.currentChat?.image
                }
                color={Colors.white}
                size={IconSize.small}
              />
              <View>
                <Text color={Colors.white} fontSize={18} fontWeight={600}>
                  {chatName!}
                </Text>
                {isPrivate &&
                  !isEmpty(participants[0]?.lastOnline) &&
                  !isEmpty(participants[0]?.isOnline) &&
                  (isTrue(participants[0]?.isOnline) ? (
                    <Text color={Colors.white} fontSize={12} fontWeight={500}>
                      онлайн
                    </Text>
                  ) : (
                    <Text color={Colors.white} fontSize={12} fontWeight={500}>
                      был(а) в{' '}
                      {dayjs.unix(participants[0]?.lastOnline!).format('hh:mm')}
                    </Text>
                  ))}
              </View>
            </Row>
          ))
        }
        rightComponent={
          isEditMode && (
            <View style={styles.editModeMenu}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleReplyButtonPress}>
                <LeftArrowIcon color={Colors.white} width={17} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleDeleteButtonPress}>
                <DeleteIcon color={Colors.white} width={12.8} height={17.6} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleForwardButtonPress}>
                <RightArrowIcon color={Colors.white} width={17} />
              </TouchableOpacity>
            </View>
          )
        }
      />
      <DataShower
        loading={chatStore.currentLoading || messageStore.loading}
        containerStyle={styles.chatContainer}>
        {!isEmpty(chatStore.currentChat) ? (
          <>
            <Pressable
              style={styles.messagesContainer}
              onPress={handleMessageInputOutsidePress}>
              <FlashList
                data={messageStore.messages}
                extraData={selectedMessages}
                renderItem={renderMessage}
                estimatedItemSize={55}
                showsVerticalScrollIndicator={false}
                inverted
              />
            </Pressable>
            <View style={styles.controllers}>
              <TextInput
                ref={inputRef}
                showSoftInputOnFocus={false}
                onFocus={handleMessageInputFocus}
                value={message}
                style={styles.input}
                placeholder={'Насмайлить сообщение...'}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={hadnleSendButtonPress}>
                <SendIcon />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text
            fontSize={16}
            fontWeight={500}
            color={Colors.greyLight}
            style={styles.emptyPlaceholder}>
            Чат не найден
          </Text>
        )}
      </DataShower>
      <Keyboard
        isVisible={isKeyboardVisible}
        onKeyPress={handleKeyboardKeyPress}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  chatContainer: {
    flex: 1,
  },
  messagesWrap: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  controllers: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 5,
    borderBottomWidth: 0,
    elevation: 7,
    paddingHorizontal: 10,
    shadowColor: Colors.darkShadow,
    backgroundColor: Colors.white,
    borderRadius: 10,
    fontFamily: 'MontserratMedium',
    fontSize: 16,
  },
  messageWrap: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  sentMessageWrap: {
    justifyContent: 'flex-end',
  },
  selectedMessageWrap: {
    backgroundColor: Colors.lightBlue,
  },
  message: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: Colors.greySuperLight,
  },
  messageTime: {
    marginRight: 4,
  },
  setMessage: {
    backgroundColor: Colors.greenSuperLight,
  },
  sendButton: {
    width: 43,
    height: 43,
    borderRadius: 10,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyPlaceholder: {
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
  },
  button: {
    width: 31,
    height: 31,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.greenLight,
    backgroundColor: Colors.transparent,
    marginLeft: 16,
  },
  editModeMenu: {
    flexDirection: 'row',
  },
});
