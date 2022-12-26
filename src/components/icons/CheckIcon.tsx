import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const CheckIcon = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 24} height={height || 18} viewBox={`0 0 ${24} ${18}`}>
      <Path d="m2 7.017 7.619 8.026L22 2" stroke={color || Colors.white} strokeWidth={3} strokeLinecap="round" />
    </Svg>
  );
};
