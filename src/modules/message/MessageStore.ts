import firestore from '@react-native-firebase/firestore';
import {makeAutoObservable} from 'mobx';

import {Nullable} from '../../base/types/BaseTypes';
import MessageService from './MessageService';
import {Message} from './models/Message';

export class MessageStore {
  messages: Message[] = [];
  offset: number = 0;
  totalCount: Nullable<number> = null;
  hasMore: boolean = true;
  loading: boolean = false;
  refreshLoading: boolean = false;
  hasMoreLoading: boolean = false;

  private messageService: MessageService;

  readonly LIMIT = 10;

  constructor() {
    makeAutoObservable(this);

    this.messageService = new MessageService();
  }

  getMessages = (chatId: string) => {
    this.setLoading(true);

    this.messageService
      .getMessages(chatId)
      .then(messages => {
        this.setMessages([...this.messages, ...messages]);
      })
      .catch(error => {
        console.log('Get messages error', error);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  readMessages = (chatId: string, userId: string) => {
    this.messageService
      .readMessages(chatId, userId)
      .then(() => {
        const updatedMessages = this.messages.map(message => ({
          ...message,
          readedBy: [...message.readedBy, userId],
        }));

        this.setMessages(updatedMessages as Message[]);
      })
      .catch(error => {
        console.log('Read messages error', error);
      });
  };

  sendMessage = (chatId: string, userId: string, content: string) => {
    const message = {
      chatId,
      content,
      sender: userId,
      readedBy: [userId],
      sentAt: firestore.FieldValue.serverTimestamp(),
    } as Message;

    return this.messageService
      .sendMessage(message)
      .then(message => {
        this.setMessages([message, ...this.messages]);
      })
      .catch(error => {
        console.log('Send message error', error);
      });
  };

  deleteMessages = (messageIds: Message['id'][]) => {
    return this.messageService
      .deleteMessages(messageIds)
      .then(() => {
        this.setMessages(
          this.messages.filter(message => !messageIds.includes(message.id)),
        );
      })
      .catch(error => {
        console.log('Delete messages error', error);
      });
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  setRefreshLoading = (refreshLoading: boolean) => {
    this.refreshLoading = refreshLoading;
  };

  setMessages = (messages: Message[]) => {
    this.messages = messages;
  };

  resetMessages = () => {
    this.messages = [];
    this.hasMore = true;
    this.offset = 0;
  };

  setOffset = (offset: number) => {
    this.offset = offset;
  };

  setHasMore = (hasMore: boolean) => {
    this.hasMore = hasMore;
  };

  setTotalCount = (totalCount: number) => {
    this.totalCount = totalCount;
  };
}
