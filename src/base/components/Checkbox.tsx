import {observer} from 'mobx-react-lite';
import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CheckIcon} from '../../components/icons/CheckIcon';

import {Colors} from '../../styles/Colors';
import {isTrue} from '../utils/baseUtil';

export interface ICheckboxProps {
  value: boolean;
  onChange?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export const Checkbox = observer(
  ({style, value, onChange, disabled = false}: ICheckboxProps) => {
    return (
      <TouchableOpacity
        onPress={onChange}
        style={[styles.checkbox, isTrue(value) && styles.checked, style]}
        disabled={disabled}>
        {isTrue(value) && (
          <CheckIcon color={Colors.green} width={14.4} height={10.8} />
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.greyLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    borderColor: Colors.green,
  },
});
