import firestore from '@react-native-firebase/firestore';

import {modelFactory} from '../../base/ModelFactory';
import {Message} from '../message/models/Message';
import {CreateChatDto} from './dto/CreateChatDto';
import {Chat} from './models/Chat';

export default class ChatService {
  constructor() {}

  getChatByPrticipant = async (participantId: string) => {
    const snapshot = await firestore()
      .collection('chats')
      .where('membersIds', 'array-contains', participantId)
      .limit(1)
      .get();

    const data = await snapshot.docs[0].data();

    return modelFactory.create<Chat>(Chat, data as any);
  };

  getCurrentChat = async (id: string) => {
    const snapshot = await firestore().collection('chats').doc(id).get();
    const data = {...snapshot.data(), id: snapshot.id};

    return modelFactory.create<Chat>(Chat, data as any);
  };

  getChats = async (userId: string) => {
    return await firestore()
      .collection('chats')
      .where(`membersIds`, 'array-contains', userId)
      // .orderBy('lastMessage.sentAt')
      .get()
      .then(async response => {
        const docs = await Promise.all(
          response.docs.map(async doc => {
            const readedMessages = await firestore()
              .collection('messages')
              .where(`chatId`, '==', doc.id)
              .where('readedBy', 'array-contains', userId)
              .get();

            const chat = doc.data();

            return {
              ...chat,
              unreadCount: chat.totalCount - readedMessages.docs.length,
              id: doc.id,
            };
          }),
        );

        return modelFactory.createList<Chat>(Chat, docs as any);
      });
  };

  createChat = async (dto: CreateChatDto) => {
    return await firestore()
      .collection('chats')
      .add(dto)
      .then(doc => {
        return modelFactory.create<Chat>(Chat, {...dto, id: doc.id} as any);
      });
  };

  setLastMessage = async (chatId: string, lastMessage: Message) => {
    return await firestore().collection('chats').doc(chatId).update({
      lastMessage,
    });
  };

  incrementMessagesCounter = async (chatId: string) => {
    const totalCount = firestore.FieldValue.increment(1);

    return Promise.all([
      firestore().collection('chats').doc(chatId).update({totalCount}),
      firestore().collection('chats').doc(chatId).get(),
    ]).then(([_, doc]) => {
      return modelFactory.create<Chat>(Chat, {
        ...doc.data(),
        id: doc.id,
      } as any);
    });
  };

  decrementMessagesCounter = async (chatId: string) => {
    const totalCount = firestore.FieldValue.increment(-1);

    return Promise.all([
      firestore().collection('chats').doc(chatId).update({totalCount}),
      firestore().collection('chats').doc(chatId).get(),
    ]).then(([_, doc]) => {
      return modelFactory.create<Chat>(Chat, {
        ...doc.data(),
        id: doc.id,
      } as any);
    });
  };
}
