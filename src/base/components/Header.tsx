import React, { ReactNode } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '../../styles/Colors';

interface IHeaderProps {
  floating?: boolean;
  backgroundColor?: string;
  statusBarColor?: string;
  centerComponent?: ReactNode;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
}

export const Header = ({
  floating,
  statusBarColor,
  backgroundColor,
  centerComponent,
  leftComponent,
  rightComponent,
}: IHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar backgroundColor={statusBarColor || Colors.greenDarkLight} />
      <View
        style={[
          styles.header,
          {
            height: 55 + insets.top,
            paddingTop: insets.top,
            backgroundColor: backgroundColor ?? Colors.green,
          },
          floating && styles.floating,
        ]}
      >
        {leftComponent && <View style={styles.leftComponent}>{leftComponent}</View>}

        {centerComponent && <View style={styles.centerComponent}>{centerComponent}</View>}

        {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  floating: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },
  leftComponent: {},
  centerComponent: {
    marginLeft: 17,
    flex: 1,
    justifyContent: 'flex-start',
  },
  rightComponent: {
    marginLeft: 'auto',
  },
});
