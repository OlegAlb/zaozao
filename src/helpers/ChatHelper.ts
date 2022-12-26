import {ChatTypes} from '../components/types/ChatTypes';
import {Chat} from '../modules/chat/models/Chat';
import {User} from '../modules/common/models/User';

export default class ChatHelper {
  static getOwner = (members: Chat['membersData'], ownerId: Chat['owner']) => {
    return members.find(member => member.id === ownerId);
  };

  static getParticipants = (
    members: Chat['membersData'],
    ownerId: Chat['owner'],
  ) => {
    return members.filter(member => member.id !== ownerId);
  };
}
