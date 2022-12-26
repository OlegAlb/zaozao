import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {Colors} from '../../styles/Colors';
import {IIconProps} from './types/Icon';

export const DeleteIcon = ({width, height, color}: IIconProps) => {
  return (
    <Svg
      width={width || 16}
      height={height || 22}
      viewBox={`0 0 ${16} ${22}`}
      fill="none">
      <Path
        d="M1.497 6.29H15a.74.74 0 0 1 .74.739v11.557a3.567 3.567 0 0 1-3.562 3.563H4.32a3.567 3.567 0 0 1-3.562-3.563V7.03a.74.74 0 0 1 .74-.74Zm8.53 11.403a.909.909 0 0 0 1.818 0v-6.948a.909.909 0 0 0-1.818 0v6.948Zm-5.374 0a.909.909 0 0 0 1.817 0v-6.948a.909.909 0 0 0-1.817 0v6.948ZM2.238 1.151h3.223v-.28c0-.48.391-.871.872-.871h3.832c.48 0 .871.391.871.872v.28h3.223a2.24 2.24 0 0 1 2.238 2.237v1.435a.465.465 0 0 1-.465.465H.465A.465.465 0 0 1 0 4.824V3.39a2.24 2.24 0 0 1 2.238-2.238Z"
        fill={color || Colors.greyLight}
      />
    </Svg>
  );
};
