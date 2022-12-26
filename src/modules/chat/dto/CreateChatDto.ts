import {jsonProperty, Serializable} from 'ts-serializable';

import {Nullable} from '../../../base/types/BaseTypes';
import {User} from '../../common/models/User';
import {Message} from '../../message/models/Message';

export class CreateChatDto extends Serializable {
  @jsonProperty(String, null) image: Nullable<string> = null;
  @jsonProperty(String, null) name: Nullable<string> = null;
  @jsonProperty([String], null) adminIds: string[] = [];
  @jsonProperty([String], null) canEditSettings: string[] = [];
  @jsonProperty([String], null) canSendMessages: string[] = [];
  @jsonProperty(Message, null) lastMessage: Nullable<Message> = null;
  @jsonProperty([String], null) membersIds: string[] = [];
  @jsonProperty([User], null) membersData: User[] = [];
  @jsonProperty(Number, null) unreadCount: Nullable<number> = null;
  @jsonProperty(Number, null) totalCount: Nullable<number> = null;
  @jsonProperty(String, null) owner: Nullable<string> = null;
  @jsonProperty(String, null) type: Nullable<string> = null;
}
