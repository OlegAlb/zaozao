import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

import { Colors } from '../../styles/Colors';

interface IMaskedInputProps extends TextInputMaskProps {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  containerErrorStyle?: StyleProp<ViewStyle>;
  label?: string;
  errorMessage?: string;
  errorMessageStyle?: StyleProp<TextStyle>;
  isValid?: boolean;
  isRequired?: boolean;
  requiredMessage?: string;
  onChangeText: (value: string) => void;
}

export const MaskedInput = (props: IMaskedInputProps) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);

  return (
    <View style={[styles.container, props.containerStyle]}>
      <View
        style={[styles.MaskedInputWrap, !props.isValid && isTouched && styles.errorMaskedInputWrap]}
        pointerEvents={props.editable === false ? 'none' : 'auto'}
      >
        {props.leftComponent ? <View style={styles.leftComponentWrap}>{props.leftComponent}</View> : null}
        <TextInputMask
          {...props}
          onChangeText={value => {
            if (!isTouched) {
              setIsTouched(true);
            }
            props.onChangeText(value);
          }}
          style={styles.MaskedInput}
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
    flex: 1,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: 0,
  },
  MaskedInputWrap: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderBottomWidth: 2,
    borderColor: Colors.greyLight,
  },
  errorMaskedInputWrap: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorTransparent,
  },
  MaskedInput: {
    flex: 1,
    margin: 0,
    paddingHorizontal: 12,
    color: Colors.onSurfacePrimary,
    fontSize: 16,
    fontFamily: 'MontserratSemiBold',
  },
  errorWrap: {
    position: 'absolute',
    bottom: -21,
  },
  leftComponentWrap: {
    justifyContent: 'center',
    paddingLeft: 12,
  },
  rightComponentWrap: {
    justifyContent: 'center',
    paddingRight: 12,
  },
});
