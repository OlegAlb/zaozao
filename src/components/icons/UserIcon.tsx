import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const UserIcon = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 45} height={height || 45}>
      <Circle cx={22.5} cy={22.5} r={21.5} stroke={color || Colors.greyLight} strokeWidth={2} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45 22.5c0 7.107-3.295 13.445-8.441 17.568C34.97 33.133 29.279 28 22.5 28c-6.779 0-12.47 5.133-14.059 12.068C3.295 35.945 0 29.608 0 22.5 0 10.074 10.074 0 22.5 0S45 10.074 45 22.5Zm-22.5 2.976a6.422 6.422 0 1 0 0-12.844 6.422 6.422 0 0 0 0 12.844Z"
        fill={color || Colors.greyLight}
      />
    </Svg>
  );
};
