import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const EnterIcon = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 17} height={height || 12} viewBox={`0 0 ${17} ${12}`} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.31.75a.75.75 0 1 0-1.5 0V6.5H2.871l2.22-2.22a.75.75 0 0 0-1.06-1.06L0 7.25l4.03 4.03a.75.75 0 0 0 1.061-1.06L2.871 8h13.44V.75Z"
        fill={color || Colors.black}
      />
    </Svg>
  );
};
