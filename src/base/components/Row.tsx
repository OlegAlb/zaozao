import React, { Children, cloneElement, FC, isValidElement, ReactElement, useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

interface IRowProps extends ViewProps {
  spacing?: number;
  rowStyle?: ViewStyle;
  itemStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

export const Row: FC<IRowProps> = props => {
  const {
    spacing,
    children,
    rowStyle,
    itemStyle,
    flexDirection = 'row',
    alignContent = 'stretch',
    alignItems = 'center',
    justifyContent = 'flex-start',
  } = props;

  const rowStyles = useMemo(() => {
    const style: StyleProp<ViewStyle> = [];

    style.push(styles.container);

    style.push({ ...styles.container, flexDirection, alignContent, alignItems, justifyContent });
    spacing && style.push({ marginHorizontal: -spacing / 2 });

    rowStyle && style.push(rowStyle);

    return style;
  }, [spacing, rowStyle, flexDirection, alignContent, alignItems, justifyContent]);

  const itemStyles = useMemo(() => {
    const style: StyleProp<ViewStyle> | StyleProp<TextStyle> = [];

    style.push(styles.item);
    spacing && style.push({ marginHorizontal: spacing / 2 });

    return style;
  }, [spacing, itemStyle]);

  return (
    <View style={rowStyles}>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<any>, {
            style: itemStyles,
          });
        }

        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  item: {
    padding: 0,
  },
});
