import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import Navigation from '../base/Navigation';
import {Colors} from '../styles/Colors';
import {LeftChevronIcon} from './icons/LeftChevronIcon';

interface BackButtonProps {
  iconColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  onPress?: () => void;
}

export const BackButton = ({
  borderColor,
  backgroundColor,
  iconColor,
  onPress,
}: BackButtonProps) => {
  const handleBackNavigation = () => {
    Navigation.goBack();
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: borderColor || Colors.greenLight,
          backgroundColor: backgroundColor || Colors.transparent,
        },
      ]}
      onPress={onPress ?? handleBackNavigation}>
      <LeftChevronIcon color={iconColor || Colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 31,
    height: 31,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
});
