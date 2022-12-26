import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { ChatsDetailScreen } from '../../screens/tabs/chats/ChatsDetailScreen';
import { ChatsMainScreen } from '../../screens/tabs/chats/ChatsMainScreen';
import { screens } from '../consts/screens';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={screens.CHATS_MAIN} component={ChatsMainScreen} />
      <Stack.Screen name={screens.CHATS_DETAIL} component={ChatsDetailScreen} />
    </Stack.Navigator>
  );
};
