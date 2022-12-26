import { RouteProp } from '@react-navigation/native';

export type ChatsStackTypes = {
  CHATS_DETAIL: {
    id: string;
  };
};

export type ChatsDetailRouteProps = RouteProp<ChatsStackTypes, 'CHATS_DETAIL'>;
