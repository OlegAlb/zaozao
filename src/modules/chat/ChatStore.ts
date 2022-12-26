import firestore from '@react-native-firebase/firestore';
import {makeAutoObservable, set} from 'mobx';

import {Dto} from '../../base/Dto';
import {Nullable} from '../../base/types/BaseTypes';
import {ChatTypes} from '../../components/types/ChatTypes';
import ArrayHelper from '../../helpers/ArrayHelper';
import {User} from '../common/models/User';
import {Message} from '../message/models/Message';
import ChatService from './ChatService';
import {CreateChatDto} from './dto/CreateChatDto';
import {CreateGroupForm, CreateGroupFormFields} from './forms/CreateGroupForm';
import {Chat} from './models/Chat';

export class ChatStore {
  chats: Chat[] = [];
  offset: number = 0;
  totalCount: Nullable<number> = null;
  loading: boolean = false;
  refreshLoading: boolean = false;

  currentChat: Nullable<Chat> = null;
  currentLoading: boolean = false;

  createGroupForm = CreateGroupForm;

  private chatService: ChatService;

  readonly LIMIT = 10;

  constructor() {
    makeAutoObservable(this);

    this.chatService = new ChatService();
  }

  getChats = (userId: string) => {
    this.setLoading(true);

    this.chatService
      .getChats(userId)
      .then(chats => {
        console.log('chats', chats);
        this.setChats(chats);
      })
      .catch(error => {
        console.log('Get chats error', error);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  getCurrentChat = async (id: string) => {
    this.setCurrentLoading(true);

    return this.chatService
      .getCurrentChat(id)
      .then(chat => {
        this.setCurrentChat(chat);
        return chat;
      })
      .catch(error => {
        console.log('Get current chat error', error);
        return null;
      })
      .finally(() => {
        this.setCurrentLoading(false);
      });
  };

  getChatByPrticipant = async (participantId: string) => {
    this.setCurrentLoading(true);

    this.chatService
      .getChatByPrticipant(participantId)
      .then(chat => {
        this.setCurrentChat(chat);
      })
      .catch(error => {
        console.log('Get chat by participant error', error);
      })
      .finally(() => {
        this.setCurrentLoading(true);
      });
  };

  createChat = async (user: User, participant: User) => {
    const dto = Dto.populate(CreateChatDto, {
      adminIds: [user.id],
      membersIds: [user.id, participant.id],
      membersData: [user, participant],
      owner: user.id,
      type: ChatTypes.private,
    });

    await this.chatService
      .createChat(dto)
      .then(chat => {
        this.setCurrentChat(chat);
        this.setChats(ArrayHelper.add(this.chats, chat));
      })
      .catch(() => {
        console.log('Create chat error');
      });
  };

  createGroup = async (user: User) => {
    const dto = Dto.populate(CreateChatDto, {
      adminIds: [user.id],
      owner: user.id,
      type: ChatTypes.group,
      canEditSettings: [user.id, ...this.createGroupForm.membersIds],
      canSendMessages: [user.id, ...this.createGroupForm.membersIds],
      membersIds: [user.id, ...this.createGroupForm.membersIds],
      membersData: [user, ...this.createGroupForm.membersData],
    });

    await this.chatService
      .createChat(dto)
      .then(chat => {
        console.log('group', chat);
        this.setCurrentChat(chat);
        this.setChats(ArrayHelper.add(this.chats, chat));
      })
      .catch(() => {
        console.log('Create group error');
      });
  };

  incrementMessageCounters = async (chatId: string) => {
    return this.chatService
      .incrementMessagesCounter(chatId)
      .then(chat => {
        this.setCurrentChat(chat);
        this.setChats(ArrayHelper.replace(this.chats, chat));
      })
      .catch(() => {
        console.log('Increment message counters error');
      });
  };

  decrementMessageCounters = async (chatId: string) => {
    return this.chatService
      .decrementMessagesCounter(chatId)
      .then(chat => {
        this.setCurrentChat(chat);
        this.setChats(ArrayHelper.replace(this.chats, chat));
      })
      .catch(() => {
        console.log('Increment message counters error');
      });
  };

  changeCreateGroupForm = (key: CreateGroupFormFields, value: any) => {
    set(this.createGroupForm, key, value);
  };

  setLastMessage = async (chatId: string, userId: string, content: string) => {
    const message = {
      chatId,
      content,
      sender: userId,
      readedBy: [userId],
      sentAt: firestore.FieldValue.serverTimestamp(),
    } as Message;

    return this.chatService
      .setLastMessage(chatId, message)
      .then(() => {
        const chat = {...this.currentChat, lastMessage: message} as Chat;

        this.setCurrentChat(chat);
        this.setChats(ArrayHelper.replace(this.chats, chat));
      })
      .catch(error => {
        console.log('Set last message error', error);
      });
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  setRefreshLoading = (refreshLoading: boolean) => {
    this.refreshLoading = refreshLoading;
  };

  setChats = (chats: Chat[]) => {
    this.chats = chats;
  };

  resetChats = () => {
    this.chats = [];
  };

  setOffset = (offset: number) => {
    this.offset = offset;
  };

  setTotalCount = (totalCount: number) => {
    this.totalCount = totalCount;
  };

  setCurrentLoading = (currentLoading: boolean) => {
    this.currentLoading = currentLoading;
  };

  setCurrentChat = (currentChat: Nullable<Chat>) => {
    this.currentChat = currentChat;
  };

  resetCurrentChat = () => {
    this.currentChat = null;
  };
}
