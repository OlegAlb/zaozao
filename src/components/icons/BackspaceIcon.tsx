import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const BackspaceIcon = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 21} height={height || 14} viewBox={`0 0 ${21} ${14}`} fill="none">
      <Path
        d="M20.202 13.075H6.025a.77.77 0 0 1-.569-.251L.201 7.055a.77.77 0 0 1 0-1.036L5.456.251A.77.77 0 0 1 6.025 0h14.177c.425 0 .77.344.77.769v11.537a.77.77 0 0 1-.77.769Zm-.769-11.537H6.364l-4.554 5 4.554 4.999h13.069V1.538Z"
        fill={color || Colors.black}
      />
      <Path
        d="M14.487 9.187a.77.77 0 0 1-1.087-.006L9.246 4.976a.77.77 0 0 1 1.095-1.081l4.153 4.204a.77.77 0 0 1-.007 1.088Z"
        fill={color || Colors.black}
      />
      <Path
        d="M14.514 5.008 10.31 9.161a.77.77 0 0 1-1.081-1.095l4.204-4.153a.767.767 0 0 1 1.087.007.769.769 0 0 1-.006 1.088Z"
        fill={color || Colors.black}
      />
    </Svg>
  );
};
