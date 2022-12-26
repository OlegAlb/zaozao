import React from 'react';
import Svg, { Circle } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const OptionsIcon = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 4} height={height || 18} viewBox={`0 0 ${4} ${18}`} fill="none">
      <Circle cx={1.75} cy={1.75} r={1.75} fill={color || Colors.white} />
      <Circle cx={1.75} cy={8.75} r={1.75} fill={color || Colors.white} />
      <Circle cx={1.75} cy={15.75} r={1.75} fill={color || Colors.white} />
    </Svg>
  );
};
