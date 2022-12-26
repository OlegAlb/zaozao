import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {Colors} from '../../styles/Colors';
import {IIconProps} from './types/Icon';

export const RightArrowIcon = ({width, height, color}: IIconProps) => {
  return (
    <Svg
      width={width || 19}
      height={height || 15}
      viewBox={`0 0 ${19} ${15}`}
      fill="none">
      <Path
        d="M.391 14.285a.39.39 0 0 0 .35-.22c.022-.044 1.813-3.424 9.287-3.539v3.362c0 .151.085.29.218.356a.386.386 0 0 0 .41-.04l8.19-6.389a.4.4 0 0 0 0-.631L10.656.796a.386.386 0 0 0-.41-.041.398.398 0 0 0-.218.356v3.543a11.78 11.78 0 0 0-.76-.024C6.483 4.63 0 5.532 0 13.887a.396.396 0 0 0 .391.398Z"
        fill={color || Colors.black}
      />
    </Svg>
  );
};
