import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const FoodIcon = ({ width, height, color }: IIconProps) => {
  return (
    <Svg width={width || 21} height={height || 24} viewBox={`0 0 ${21} ${24}`}>
      <Path
        d="M15.89 5.456a5.827 5.827 0 0 0-4.137.877c.367-.806.941-1.536 1.718-2.179a7.51 7.51 0 0 1 1.81-1.117.705.705 0 0 0-.509-1.316c-.111.043-1.858.738-3.238 2.36a4.81 4.81 0 0 0-.222-.767C10.491 1.174 8.235.11 8.14.065a.706.706 0 0 0-.945.363C7.153.525 6.19 2.826 7.01 4.965c.074.192.16.376.254.552a5.852 5.852 0 0 0-2.2-.06C1.8 5.982-.438 9.131.073 12.476c.363 2.381.894 4.426 1.579 6.078.776 1.874 1.756 3.252 2.914 4.096a5.066 5.066 0 0 0 3.045 1.003c.306 0 .62-.025.94-.077a4.238 4.238 0 0 0 1.927-.805c.545.416 1.19.686 1.927.805 1.474.238 2.815-.074 3.985-.926 1.157-.844 2.137-2.222 2.914-4.096.684-1.652 1.215-3.697 1.579-6.078.51-3.345-1.73-6.494-4.992-7.02ZM8.253 1.765c.584.404 1.375 1.095 1.743 2.054.366.953.24 2.001.076 2.694-.584-.403-1.375-1.095-1.743-2.054-.366-.953-.24-2-.076-2.694Zm11.236 10.5c-.716 4.697-2.075 7.895-3.93 9.246-.866.631-1.824.852-2.928.674-.677-.11-1.211-.385-1.634-.843a.706.706 0 0 0-1.037 0c-.422.458-.957.733-1.634.843-1.104.178-2.062-.043-2.929-.674-1.854-1.351-3.212-4.549-3.93-9.246-.393-2.583 1.321-5.013 3.823-5.416a4.454 4.454 0 0 1 3.436.872 2.893 2.893 0 0 0 3.505 0 4.444 4.444 0 0 1 3.436-.872c2.502.403 4.216 2.833 3.822 5.415Z"
        fill={color || Colors.grey}
      />
    </Svg>
  );
};