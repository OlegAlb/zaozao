import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {observer} from 'mobx-react-lite';
import {Header} from '../../base/components/Header';
import {Text} from '../../base/components/Text';
import {useRootStore} from '../../base/hooks/useRootStore';
import Navigation from '../../base/Navigation';
import {isEmpty} from '../../base/utils/baseUtil';
import {LogoSm} from '../../components/icons/LogoSm';
import {MenuPopup} from '../../components/MenuPopup';
import StringHelper from '../../helpers/StringHelper';
import {Colors} from '../../styles/Colors';
import {screens} from '../consts/screens';
import {Tabs} from '../consts/tabs';
import ChatsStack from '../stacks/ChatsStack';
import ContactsStack from '../stacks/ContactsStack';
import GroupsStack from '../stacks/GroupsStack';

const Tab = createMaterialTopTabNavigator();

export const TabNavigator = observer(() => {
  const {contactsStore, profileStore, chatStore} = useRootStore();
  const hideOnScreens = [
    screens.CONTACTS_DETAIL,
    screens.CHATS_DETAIL,
    screens.GROUPS_DETAIL,
    screens.GROUPS_CREATE,
    screens.GROUPS_ADD_PARTICIPANTS,
  ];
  const currentRoute = Navigation.navigationRef.current?.getCurrentRoute();

  useEffect(() => {
    const init = async () => {
      await contactsStore.getContacts();
      await chatStore.getChats(profileStore.profile?.id!);
    };

    init();
  }, []);

  const renderContactsTitle = () => {
    return !isEmpty(contactsStore.contacts) ? (
      <Text color={Colors.white} fontWeight={500} fontSize={12}>
        {StringHelper.getNoun(contactsStore.contacts.length, [
          'контакт',
          'контакта',
          'контактов',
        ])}
      </Text>
    ) : (
      <LogoSm color={Colors.white} />
    );
  };

  const getTabBarVisible = () => {
    if (hideOnScreens.find(screen => screen === currentRoute?.name)) {
      return 'none';
    }
    return 'flex';
  };

  const renderHeader = () => {
    switch (currentRoute?.name) {
      case screens.MAIN_APP:
      case screens.CHATS_MAIN:
      case screens.GROUPS_MAIN:
        return (
          <Header
            leftComponent={<LogoSm color={Colors.white} />}
            rightComponent={<MenuPopup />}
          />
        );
      case screens.CONTACTS_MAIN:
        return (
          <Header
            leftComponent={renderContactsTitle()}
            rightComponent={<MenuPopup />}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderHeader()}
      <Tab.Navigator
        initialRouteName={Navigation.initialRoute}
        screenOptions={{
          swipeEnabled: false,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarStyle: styles.tabBarStyle,
          tabBarIndicator: () => null,
          tabBarActiveTintColor: Colors.white,
          tabBarInactiveTintColor: Colors.greenSuperLight,
          tabBarPressColor: Colors.transparent,
          tabBarItemStyle: {display: getTabBarVisible()},
        }}>
        <Tab.Screen
          name={Tabs.TAB_CHATS}
          component={ChatsStack}
          options={{
            tabBarLabel: 'Чаты',
          }}
        />

        <Tab.Screen
          name={Tabs.TAB_CONTACTS}
          component={ContactsStack}
          options={() => ({
            tabBarLabel: 'Контакты',
          })}
        />

        <Tab.Screen
          name={Tabs.TAB_GROUPS}
          component={GroupsStack}
          options={() => ({
            tabBarLabel: 'Группы',
          })}
        />
      </Tab.Navigator>
    </>
  );
});

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    textTransform: 'capitalize',
    fontFamily: 'MontserratBold',
    fontSize: 15,
  },
  tabBarStyle: {
    backgroundColor: Colors.green,
  },
});
