import firestore from '@react-native-firebase/firestore';

import {modelFactory} from '../../base/ModelFactory';
import {Message} from './models/Message';

export default class MessageService {
  constructor() {}

  getMessages = async (chatId: string) => {
    return await firestore()
      .collection('messages')
      .where(`chatId`, '==', chatId)
      .orderBy('sentAt')
      .get()
      .then(response => {
        const docs = response.docs.map(doc => {
          const message = doc.data();

          return {...message, id: doc.id};
        });

        return modelFactory.createList<Message>(Message, docs as any);
      });
  };

  readMessages = async (chatId: string, userId: string) => {
    return await firestore()
      .collection('messages')
      .where(`chatId`, '==', chatId)
      .get()
      .then(result => {
        result.docs.forEach(doc => {
          firestore()
            .collection('messages')
            .doc(doc.id)
            .update({
              readedBy: firestore.FieldValue.arrayUnion([userId]),
            });
        });
      });
  };

  sendMessage = async (message: Message) => {
    return firestore()
      .collection('messages')
      .add(message)
      .then(async response => {
        const doc = await response.get();
        const message = doc.data();
        const data = {...message, id: doc.id};

        return modelFactory.create<Message>(Message, data as any);
      });
  };

  deleteMessages = async (messageIds: Message['id'][]) => {
    return await Promise.all(
      messageIds.map(messageId => {
        return firestore().collection('messages').doc(messageId!).delete();
      }),
    );
  };
}
