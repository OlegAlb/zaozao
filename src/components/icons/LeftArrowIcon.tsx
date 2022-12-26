import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {Colors} from '../../styles/Colors';
import {IIconProps} from './types/Icon';

export const LeftArrowIcon = ({width, height, color}: IIconProps) => {
  return (
    <Svg
      width={width || 19}
      height={height || 15}
      viewBox={`0 0 ${19} ${15}`}
      fill="none">
      <Path
        d="M18.609 14.285a.39.39 0 0 1-.35-.22c-.022-.044-1.813-3.424-9.287-3.539v3.362c0 .151-.085.29-.218.356a.386.386 0 0 1-.41-.04L.153 7.814a.4.4 0 0 1 0-.631L8.344.796a.386.386 0 0 1 .41-.041.398.398 0 0 1 .218.356v3.543c.198-.013.455-.024.76-.024 2.786 0 9.268.902 9.268 9.257a.396.396 0 0 1-.391.398Z"
        fill={color || Colors.black}
      />
    </Svg>
  );
};
