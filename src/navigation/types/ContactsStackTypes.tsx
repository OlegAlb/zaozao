import { RouteProp } from '@react-navigation/native';

export type ContactsStackParamList = {
  CONTACTS_DETAIL: {
    id: string;
  };
};

export type ContactsDetailRouteProps = RouteProp<ContactsStackParamList, 'CONTACTS_DETAIL'>;
