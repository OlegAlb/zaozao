import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const UserIconSm = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 43} height={height || 43}>
      <Circle cx={21.5} cy={21.5} r={20.5} stroke={color || Colors.greyLight} strokeWidth={2} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43 21.5c0 6.791-3.149 12.847-8.066 16.787-1.517-6.627-6.957-11.531-13.434-11.531-6.477 0-11.917 4.904-13.434 11.531C3.149 34.347 0 28.291 0 21.5 0 9.626 9.626 0 21.5 0S43 9.626 43 21.5Zm-21.5 2.844a6.137 6.137 0 1 0 0-12.274 6.137 6.137 0 0 0 0 12.274Z"
        fill={color || Colors.greyLight}
      />
    </Svg>
  );
};
