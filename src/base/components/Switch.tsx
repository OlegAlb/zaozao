import React from 'react';
import { Switch as RNSwitch } from 'react-native';

import { Colors } from '../../styles/Colors';

interface ISwitchProps {
  active: boolean;
  onValueChange: (value: boolean) => void;
}

export const Switch = ({ active, onValueChange }: ISwitchProps) => {
  return (
    <RNSwitch
      // trackColor={{
      //   false: Colors.shadow,
      //   true: Colors.primary,
      // }}
      // thumbColor={Colors.white}
      // ios_backgroundColor={Colors.white}
      value={active}
      onValueChange={() => onValueChange(!active)}
    />
  );
};
