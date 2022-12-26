import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const ChatIcon = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 20} height={height || 20} viewBox={`0 0 ${20} ${20}`} fill="none">
      <Path
        d="M16.218 2.93c-3.713-3.906-9.722-3.907-13.435 0C-.202 6.07-.767 10.74.998 14.46L.02 18.99c-.127.588.374 1.116.934.982l4.304-1.03C11.516 22.23 19 17.47 19 9.998c0-2.67-.988-5.18-2.782-7.067Zm-4.736 9.556H5.537c-.431 0-.78-.368-.78-.821 0-.453.349-.82.78-.82h5.945c.43 0 .78.367.78.82 0 .453-.35.82-.78.82Zm1.982-3.336H5.537c-.431 0-.78-.367-.78-.82 0-.454.349-.822.78-.822h7.927c.43 0 .78.368.78.821 0 .454-.35.821-.78.821Z"
        fill={color || Colors.green}
      />
    </Svg>
  );
};
