import {NavigationContainerRef} from '@react-navigation/core';
import * as React from 'react';

import {Tabs} from '../navigation/consts/tabs';

export interface NavigationParams {
  [key: string]: any;
}

class NavigationC {
  navigationRef = React.createRef<NavigationContainerRef<any>>();

  initialRoute: string = Tabs.TAB_CHATS;

  setInitialRoute = (route: string) => {
    this.initialRoute = route;
  };

  navigate = (routeName: string, params?: NavigationParams) => {
    this.navigationRef.current?.navigate(routeName, params);
  };

  replace = (routeName: string, params?: NavigationParams) => {
    this.navigationRef.current?.reset({
      index: 0,
      routes: [{name: routeName, params: params}],
    });
  };

  goBack = () => {
    this.navigationRef.current?.goBack();
  };
}

const Navigation = new NavigationC();
export default Navigation;
