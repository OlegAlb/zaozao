import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const BanIcon = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 20} height={height || 20} viewBox={`0 0 ${20} ${20}`} fill="none">
      <Path
        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0ZM6.068 4.04A7.143 7.143 0 0 1 10 2.856a7.1 7.1 0 0 1 3.936 1.186l-9.893 9.893a7.143 7.143 0 0 1 2.025-9.897Zm7.864 11.92A7.144 7.144 0 0 1 10 17.144a7.1 7.1 0 0 1-3.936-1.186l9.893-9.893a7.143 7.143 0 0 1-2.025 9.897Z"
        fill={color || Colors.red}
      />
    </Svg>
  );
};
