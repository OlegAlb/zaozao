import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Navigation from '../base/Navigation';
import { Stacks } from './consts/stacks';
import AuthStack from './stacks/AuthStack';
import SplashStack from './stacks/SplashStack';
import { TabsStack } from './stacks/TabsStack';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer ref={Navigation.navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Stacks.SPLASH_STACK} component={SplashStack} />
        <Stack.Screen name={Stacks.AUTH_STACK} component={AuthStack} />
        {TabsStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
