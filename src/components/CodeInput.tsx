import React, { FC, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, ViewProps } from 'react-native';

import { Text } from '../base/components/Text';
import { Colors } from '../styles/Colors';

interface CodeInputProps extends ViewProps {
  maxLength: number;
  onChange: (value: string) => void;
}

export const CodeInput: FC<CodeInputProps> = ({ style, maxLength, onChange }) => {
  const inputRef = useRef<TextInput>(null);
  const [codeState, setCodeState] = useState('');
  const setCode = (code: string) => setCodeState(code);

  useEffect(() => {
    onChange(codeState);
  }, [codeState]);

  const handleCellPress = (item: number) => {
    if (!inputRef.current?.isFocused()) {
      inputRef.current?.focus();
    }

    setCodeState(codeState.slice(0, item));
  };

  const renderCell = (item: number) => {
    return (
      <Pressable key={item} style={[styles.cell, item === 2 && styles.thirdCell]} onPress={() => handleCellPress(item)}>
        <Text>{[...codeState][item] ?? ''}</Text>
      </Pressable>
    );
  };

  return (
    <View style={style}>
      <View style={styles.hiddenView}>
        <TextInput
          ref={inputRef}
          value={codeState}
          keyboardType="numeric"
          maxLength={maxLength}
          onChangeText={setCode}
        />
      </View>
      <View style={styles.cellsContainer}>{[...Array(maxLength).keys()].map(renderCell)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  hiddenView: {
    width: 0,
    height: 0,
  },
  cellsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    width: 31,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.greyLight,
    marginHorizontal: 3.5,
  },
  thirdCell: {
    marginRight: 20,
  },
});
