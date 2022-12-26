import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {Colors} from '../../styles/Colors';
import {IIconProps} from './types/Icon';

export const PlusIcon = ({width, height, color}: IIconProps) => {
  return (
    <Svg
      width={width || 10}
      height={height || 10}
      viewBox={`0 0 ${10} ${10}`}
      fill="none">
      <Path
        stroke={color || Colors.white}
        strokeWidth={2}
        strokeLinecap="round"
        d="M5.125 8.5v-7M1.5 5.125h7"
      />
    </Svg>
  );
};
