import CheckBox from '@react-native-community/checkbox';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Platform, StyleSheet, ViewStyle} from 'react-native';

import {Colors} from '../../styles/Colors';
import {View} from 'react-native';
import {Checkbox, ICheckboxProps} from './Checkbox';
import {Text} from './Text';

interface ITitledCheckboxProps extends ICheckboxProps {
  title: string;
}

export const TitledCheckbox = observer(
  ({title, ...props}: ITitledCheckboxProps) => {
    return (
      <View style={styles.container}>
        <Text
          fontWeight={500}
          fontSize={13}
          color={Colors.black}
          style={styles.title}>
          {title}
        </Text>
        <Checkbox {...props} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginRight: 11,
  },
});
