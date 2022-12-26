import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {Portal} from 'react-native-portalize';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';

import Navigation from '../base/Navigation';
import {Text} from '../base/components/Text';
import {screens} from '../navigation/consts/screens';
import {Colors} from '../styles/Colors';
import {OptionsIcon} from './icons/OprionsIcon';
import {ChatTypes} from './types/ChatTypes';
import {MenuItem} from './types/MenuTypes';

export const MenuPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  const menuItems: MenuItem[] = [
    {
      title: 'Новый контакт',
      screen: screens.CONTACTS_CREATE,
      options: {
        type: ChatTypes.private,
      },
    },
    {
      title: 'Новая группа',
      screen: screens.GROUPS_CREATE,
      options: {
        type: ChatTypes.group,
      },
    },
    {title: 'Новая рассылка', screen: screens.BROADCAST_CREATE},
    {title: 'Настройки', screen: screens.SETTINGS_MAIN},
  ];

  const handleMenuButtonPress = () => {
    setIsVisible(true);
  };

  const handleBackfropPress = () => {
    setIsVisible(false);
  };

  const handleMenuItemPress = (
    screen: MenuItem['screen'],
    options?: MenuItem['options'],
  ) => {
    Navigation.navigate(screen, options);
    setIsVisible(false);
  };

  const renderMenuItem = (
    {title, options, screen}: MenuItem,
    index: number,
  ) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.menuItem}
        onPress={() => handleMenuItemPress(screen, options)}>
        <Text fontWeight={600}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={handleMenuButtonPress}>
        <OptionsIcon />
      </TouchableOpacity>

      {isVisible && (
        <Portal>
          <TouchableWithoutFeedback onPress={handleBackfropPress}>
            <View style={styles.wrap}>
              <Animated.View
                entering={FadeInUp}
                exiting={FadeOutUp}
                style={styles.menuModal}>
                {menuItems.map((item, index) => renderMenuItem(item, index))}
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },

  menuButton: {
    width: 33,
    height: 33,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.greenLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuModal: {
    marginTop: 11,
    marginRight: 15,
    marginLeft: 'auto',
    minWidth: 200,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderTopRightRadius: 0,
    paddingVertical: 20,
    elevation: 10,
    shadowColor: Colors.shadow,
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
