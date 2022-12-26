import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AuthCodeScreen } from '../../screens/auth/AuthCodeScreen';
import { AuthPhoneScreen } from '../../screens/auth/AuthPhoneScreen';
import { AuthProfileScreen } from '../../screens/auth/AuthProfileScreen';
import { AuthStartScreen } from '../../screens/auth/AuthStartScreen';
import { screens } from '../consts/screens';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.AUTH_START} component={AuthStartScreen} />
      <Stack.Screen name={screens.AUTH_PHONE} component={AuthPhoneScreen} />
      <Stack.Screen name={screens.AUTH_CODE} component={AuthCodeScreen} />
      <Stack.Screen name={screens.AUTH_PROFILE} component={AuthProfileScreen} />
    </Stack.Navigator>
  );
};
