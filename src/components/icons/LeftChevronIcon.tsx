import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const LeftChevronIcon = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 10} height={height || 16} viewBox={`0 0 ${10} ${16}`}>
      <Path d="M9 1 2 8l7 7" stroke={color || Colors.black} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
};
