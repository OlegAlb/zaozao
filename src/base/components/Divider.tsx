import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../styles/Colors';

interface IDividerProps {
  marginTop?: number;
  marginBottom?: number;
  marginHorizontal?: number;
}

export const Divider = ({ marginTop, marginBottom, marginHorizontal }: IDividerProps) => {
  return <View style={[styles.container, { marginTop, marginBottom, marginHorizontal }]} />;
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: Colors.black,
  },
});
