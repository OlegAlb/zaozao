import React, { FC, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle, View } from 'react-native';

interface IColumnProps {
  container?: boolean;
  item?: boolean;
  spacing?: number;
  numRows?: number;
  customStyle?: ViewStyle;
}

export const Column: FC<IColumnProps> = props => {
  const { container, item, spacing, numRows, children, customStyle } = props;

  const combinedStyle = useMemo(() => {
    const style: StyleProp<ViewStyle> = [];

    if (container) {
      style.push(styles.container);
      spacing && style.push({ marginVertical: -[spacing / 2] });
    }

    if (item) {
      style.push(styles.item);
      spacing && style.push({ paddingVertical: spacing / 2 });

      if (numRows) {
        style.push({ height: `${100 / numRows}%` });
      } else {
        style.push({ flex: 1 });
      }
    }

    style.push(customStyle);

    return style;
  }, [container, customStyle, item, spacing]);

  return <View style={combinedStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  item: {
    padding: 0,
  },
});
