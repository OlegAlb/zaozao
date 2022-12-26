import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

import { Colors } from '../../styles/Colors';

interface IInputProps extends TextInputProps {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  containerErrorStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  label?: string;
  errorMessage?: string;
  errorMessageStyle?: StyleProp<TextStyle>;
  isValid?: boolean;
  isRequired?: boolean;
  requiredMessage?: string;
  onChangeText?: (value: string) => void;
  disabled?: boolean;
}

export const Input = (props: IInputProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);

  return (
    <View style={[styles.container, props.containerStyle]}>
      <View
        style={[styles.inputWrap, !props.isValid && isTouched && styles.errorInputWrap, props.inputStyle]}
        pointerEvents={props.editable === false ? 'none' : 'auto'}
      >
        {props.leftComponent ? <View style={styles.leftComponentWrap}>{props.leftComponent}</View> : null}
        <TextInput
          {...props}
          onChangeText={value => {
            if (!isTouched) {
              setIsTouched(true);
            }
            props.onChangeText?.(value);
          }}
          editable={!props.disabled}
          style={styles.input}
          selectionColor={Colors.cursor}
          placeholderTextColor={Colors.onSurfaceSecondary}
        />
        {props.rightComponent ? <View style={styles.rightComponentWrap}>{props.rightComponent}</View> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  inputWrap: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: Colors.greyLight,
  },
  errorInputWrap: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    margin: 0,
    padding: 0,
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'MontserratSemiBold',
  },
  leftComponentWrap: {
    justifyContent: 'center',
  },
  rightComponentWrap: {
    justifyContent: 'center',
  },
});
