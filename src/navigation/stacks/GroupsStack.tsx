import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ChatsDetailScreen} from '../../screens/tabs/chats/ChatsDetailScreen';
import {GroupsAddParticipantsScreen} from '../../screens/tabs/groups/GroupsAddParticipantsScreen';
import {GroupsCreateScreen} from '../../screens/tabs/groups/GroupsCreateScreen';
import {GroupsMainScreen} from '../../screens/tabs/groups/GroupsMainScreen';

import {screens} from '../consts/screens';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={screens.GROUPS_MAIN} component={GroupsMainScreen} />
      <Stack.Screen
        name={screens.GROUPS_DETAIL}
        component={ChatsDetailScreen}
      />
      <Stack.Screen
        name={screens.GROUPS_CREATE}
        component={GroupsCreateScreen}
      />
      <Stack.Screen
        name={screens.GROUPS_ADD_PARTICIPANTS}
        component={GroupsAddParticipantsScreen}
      />
    </Stack.Navigator>
  );
};
