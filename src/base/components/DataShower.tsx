import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Loader } from './Loader';

interface IDataShowerProps {
  loading: boolean;
  children: ReactNode;
  containerStyle?: ViewStyle;
}

export const DataShower = ({ loading, children, containerStyle }: IDataShowerProps) => {
  if (loading) {
    return (
      <View style={[styles.loadingContainer, containerStyle]}>
        <Loader />
      </View>
    );
  }

  return <View style={[styles.container, containerStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
