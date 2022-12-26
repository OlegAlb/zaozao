import React, {FC, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

interface ICenterProps {
  children?: ReactNode;
  padding?: number;
}

export const Center: FC<ICenterProps> = ({children, padding}) => {
  return <View style={[styles.center, {padding}]}>{children}</View>;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
