import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { ChatsDetailScreen } from '../../screens/tabs/chats/ChatsDetailScreen';
import { ContactsDetailScreen } from '../../screens/tabs/contacts/ContactsDetailScreen';
import { ContactsMainScreen } from '../../screens/tabs/contacts/ContactsMainScreen';
import { screens } from '../consts/screens';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={screens.CONTACTS_MAIN} component={ContactsMainScreen} />
      <Stack.Screen name={screens.CONTACTS_DETAIL} component={ContactsDetailScreen} />
      <Stack.Screen name={screens.CHATS_DETAIL} component={ChatsDetailScreen} />
    </Stack.Navigator>
  );
};
