import React, { useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import { SwipeableModal } from '../../components/SwipeableModal';
import { DownChevronIcon } from '../../components/icons/DownChevronIcon';
import { Colors } from '../../styles/Colors';
import { isEmpty } from '../utils/baseUtil';
import { Align, Text } from './Text';
import { ISelectOption } from './types/Select';

interface ISelectProps {
  onSelect: (data: ISelectOption) => void;
  options: ISelectOption[];
  placeholder?: string;
  value?: string;
  containerStyle?: ViewStyle;
  title?: string;
}

export const Select = (props: ISelectProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectPress = () => {
    setIsVisible(true);
  };

  const handleOptionPress = (item: ISelectOption) => {
    props.onSelect(item.data);
    setIsVisible(false);
  };

  const renderOption: ListRenderItem<ISelectOption> = ({ item, index }) => {
    return (
      <TouchableHighlight
        underlayColor={Colors.grey}
        style={styles.option}
        key={index}
        onPress={() => handleOptionPress(item)}
      >
        <Text>{item.title}</Text>
      </TouchableHighlight>
    );
  };

  return (
    <>
      <View style={[styles.container, props.containerStyle]}>
        <TouchableOpacity onPress={handleSelectPress} style={styles.select}>
          {props.placeholder && isEmpty(props.value) && (
            <Text
              style={styles.value}
              numberOfLines={1}
              lineBreakMode="tail"
              color={Colors.grey}
              fontWeight={600}
              align={Align.Center}
            >
              {props.placeholder}
            </Text>
          )}
          {!isEmpty(props.value) && (
            <Text
              style={styles.value}
              numberOfLines={1}
              lineBreakMode="tail"
              color={Colors.black}
              fontWeight={600}
              align={Align.Center}
            >
              {props.value}
            </Text>
          )}
          <DownChevronIcon color={Colors.black} />
        </TouchableOpacity>
      </View>

      {isVisible && (
        <Portal>
          <Animated.View style={styles.options} exiting={SlideOutDown} entering={SlideInDown}>
            {!isEmpty(props.title) && (
              <Text fontWeight={600} align={Align.Center} style={styles.optionsTitle}>
                {props.title}
              </Text>
            )}
            <FlatList data={props.options} renderItem={renderOption} showsVerticalScrollIndicator={false} />
          </Animated.View>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
  },
  label: {
    position: 'absolute',
    top: 0,
  },
  select: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderColor: Colors.greyLight,
  },
  value: {
    flex: 1,
    marginLeft: 16,
    paddingRight: 16,
  },
  options: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.white,
  },
  optionsTitle: {
    padding: 16,
  },
  option: {
    padding: 16,
  },
});
