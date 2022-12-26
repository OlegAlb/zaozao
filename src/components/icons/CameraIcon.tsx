import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const CameraIcon = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 20} height={height || 17} viewBox={`0 0 ${20} ${17}`}>
      <Path
        d="M17.595 2.701h-2.892v-.297A2.405 2.405 0 0 0 12.3 0H7.7a2.405 2.405 0 0 0-2.404 2.404v.297H2.404A2.404 2.404 0 0 0 0 5.106v8.726a2.405 2.405 0 0 0 2.404 2.405h15.192A2.405 2.405 0 0 0 20 13.832V5.106A2.406 2.406 0 0 0 17.595 2.7ZM9.999 13.743A4.546 4.546 0 0 1 5.458 9.2a4.546 4.546 0 0 1 4.54-4.541A4.546 4.546 0 0 1 14.54 9.2 4.546 4.546 0 0 1 10 13.743ZM12.403 9.2A2.408 2.408 0 0 1 10 11.605a2.408 2.408 0 0 1-2.404-2.404 2.408 2.408 0 0 1 2.404-2.404 2.408 2.408 0 0 1 2.404 2.404Z"
        fill={color || Colors.green}
      />
    </Svg>
  );
};
