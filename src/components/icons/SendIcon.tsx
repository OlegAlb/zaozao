import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const SendIcon = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 24} height={height || 23} fill="none">
      <Path d="M0 0v9.344L14.4 11.5 0 13.656V23l24-11.5L0 0Z" fill={color || Colors.white} />
    </Svg>
  );
};
