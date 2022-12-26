import React from 'react';

import {AuthStore} from '../modules/auth/AuthStore';
import {ChatStore} from '../modules/chat/ChatStore';
import {ContactsStore} from '../modules/contacts/ContactsStore';
import {FileStore} from '../modules/file/FileStore';
import {LangStore} from '../modules/lang/LangStore';
import {MessageStore} from '../modules/message/MessageStore';
import {ProfileStore} from '../modules/profile/ProfileStore';

class RootStore {
  authStore: AuthStore;
  langStore: LangStore;
  contactsStore: ContactsStore;
  profileStore: ProfileStore;
  chatStore: ChatStore;
  fileStore: FileStore;
  messageStore: MessageStore;

  constructor() {
    this.authStore = new AuthStore();
    this.langStore = new LangStore();
    this.contactsStore = new ContactsStore();
    this.profileStore = new ProfileStore();
    this.chatStore = new ChatStore();
    this.fileStore = new FileStore();
    this.messageStore = new MessageStore();
  }

  sync = async () => {
    await Promise.all(
      Object.values(this).map(store => {
        return store?.sync ? store?.sync() : Promise.resolve();
      }),
    );
  };
}

export const rootStore = new RootStore();

export const storesContext = React.createContext(rootStore);
