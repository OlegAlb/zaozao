import React, { useMemo } from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

import { Colors } from '../../styles/Colors';

export enum Align {
  Auto = 'auto',
  Left = 'left',
  Right = 'right',
  Center = 'center',
  Justify = 'justify',
}

interface IText extends TextProps {
  children?: string | React.ReactNode[];
  align?: Align;
  color?: string;
  fontSize?: TextStyle['fontSize'];
  fontWeight?: number;
}

export const Text = (props: IText) => {
  const fontFamily = useMemo(() => {
    switch (props.fontWeight) {
      case 400:
        return 'MontserratRegular';
      case 500:
        return 'MontserratMedium';
      case 600:
        return 'MontserratSemiBold';
      case 700:
        return 'MontserratBold';
    }
  }, [props.fontWeight]);

  return (
    <RNText
      {...props}
      style={[
        {
          color: props.color || Colors.black,
          textAlign: props.align || Align.Auto,
          fontSize: props.fontSize || 16,
          fontFamily,
        },
        props.style,
      ]}
    />
  );
};
