import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const DownChevronIcon = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 16} height={height || 10} viewBox={`0 0 ${16} ${10}`}>
      <Path d="m1 1 7 7 7-7" stroke={color || Colors.black} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
};
