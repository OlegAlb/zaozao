import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import {Colors} from '../../styles/Colors';
import {Text} from './Text';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

interface IButtonProps extends TouchableOpacityProps {
  title?: string;
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  textColor?: string;
  uppercase?: boolean;
  disabled?: boolean;
}

export const Button = (props: IButtonProps) => {
  const {
    title,
    style,
    loading,
    textColor,
    disabled,
    type = ButtonType.Primary,
    uppercase = false,
  } = props;

  const color = useMemo(() => {
    switch (type) {
      case ButtonType.Secondary:
        return textColor || Colors.black;

      default:
        return textColor || Colors.white;
    }
  }, [type, textColor]);

  const buttonStyles = useMemo(() => {
    return [styles.default, styles[type]];
  }, [type]);

  const renderText = () => {
    if (!loading) {
      if (title) {
        return (
          <Text fontSize={16} fontWeight={700} color={color}>
            {uppercase ? title.toUpperCase() : title}
          </Text>
        );
      }

      return null;
    }

    return <ActivityIndicator color={color} />;
  };

  return (
    <TouchableOpacity
      style={style}
      onPress={loading || disabled ? undefined : props.onPress}
      activeOpacity={disabled ? 1 : props.activeOpacity}>
      <View style={[buttonStyles, {opacity: disabled ? 0.5 : 1}]}>
        {renderText()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  [ButtonType.Primary]: {
    backgroundColor: Colors.green,
  },
  [`${ButtonType.Primary}_Text`]: {
    color: Colors.white,
  },

  [ButtonType.Secondary]: {
    backgroundColor: Colors.overlay,
  },
  [`${ButtonType.Secondary}_Text`]: {
    color: Colors.black,
  },
});
