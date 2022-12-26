import { FlashList, ListRenderItem, MasonryFlashList } from '@shopify/flash-list';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Dimensions, GestureResponderEvent, StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import emojis from '../assets/data/emojis.json';
import { Text } from '../base/components/Text';
import { Colors } from '../styles/Colors';
import { ActicityIcon } from './icons/ActicityIcon';
import { BackspaceIcon } from './icons/BackspaceIcon';
import { EnterIcon } from './icons/EnterIcon';
import { FoodIcon } from './icons/FoodIcon';
import { NatureIcon } from './icons/NatureIcon';
import { ObjectsIcon } from './icons/ObjectsIcon';
import { PeopleIcon } from './icons/PeopleIcon';
import { PlacesIcon } from './icons/PlacesIcon';
import { Emoji, EmojiCategory } from './types/EmojiTypes';
import { Group, Key } from './types/KeyboardTypes';

interface KeyboardProps extends ViewProps {
  isVisible: boolean;
  onKeyPress: (key: string) => void;
}

export const Keyboard: FC<KeyboardProps> = ({ isVisible, onKeyPress }) => {
  const ref = useRef<FlashList<Group>>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const emojiCategories = emojis.map(category => category.id as EmojiCategory);

  const height = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(height.value),
  }));

  useEffect(() => {
    isVisible ? (height.value = 250) : (height.value = 0);
  }, [isVisible]);

  const handleTabPress = (index: number) => {
    setCurrentTab(index);
    ref.current?.scrollToIndex({
      animated: false,
      index,
    });
  };

  const handleKeyPress = (value: string) => {
    onKeyPress(value);
  };

  const renderTab: ListRenderItem<EmojiCategory> = ({ item, index }) => {
    const getIcon = () => {
      switch (item) {
        case EmojiCategory.people:
          return <PeopleIcon color={index === currentTab ? Colors.white : Colors.grey} />;
        case EmojiCategory.nature:
          return <NatureIcon color={index === currentTab ? Colors.white : Colors.grey} />;
        case EmojiCategory.foods:
          return <FoodIcon color={index === currentTab ? Colors.white : Colors.grey} />;
        case EmojiCategory.activity:
          return <ActicityIcon color={index === currentTab ? Colors.white : Colors.grey} />;
        case EmojiCategory.places:
          return <PlacesIcon color={index === currentTab ? Colors.white : Colors.grey} />;
        case EmojiCategory.objects:
          return <ObjectsIcon color={index === currentTab ? Colors.white : Colors.grey} />;
        case EmojiCategory.symbols:
          return <PeopleIcon color={index === currentTab ? Colors.white : Colors.grey} />;
        case EmojiCategory.flags:
          return <PeopleIcon color={index === currentTab ? Colors.white : Colors.grey} />;
      }
    };

    return (
      <TouchableOpacity
        style={[styles.keyboardHeadButton, index === currentTab && styles.keyboardHeadButtonActive]}
        onPress={() => handleTabPress(index)}
      >
        {getIcon()}
      </TouchableOpacity>
    );
  };

  const renderGroup: ListRenderItem<Group> = ({ item }) => {
    return (
      <View style={styles.emojiBoard}>
        <MasonryFlashList data={item.emojis} renderItem={renderKey} numColumns={8} estimatedItemSize={50} />
      </View>
    );
  };

  const renderKey: ListRenderItem<Key> = ({ item }) => {
    const isEmoji = (value: Emoji | string): value is Emoji => {
      return (value as Emoji).value !== undefined;
    };

    return (
      <TouchableOpacity
        style={styles.emojiKey}
        onPress={() => handleKeyPress(isEmoji(item.value) ? item.value.value : item.value)}
      >
        <Text fontSize={20}>{isEmoji(item.value) ? item.value.value : item.value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={animatedStyle}>
      <View style={styles.keyboard}>
        <View style={styles.keyboardHead}>
          <FlashList
            data={emojiCategories}
            renderItem={renderTab}
            estimatedItemSize={53}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.keyboardBody}>
          <FlashList
            ref={ref}
            data={emojis}
            renderItem={renderGroup}
            estimatedItemSize={200}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            bounces={false}
            scrollEnabled={false}
          />
        </View>
        <View style={styles.keyboardFooter}>
          <TouchableOpacity style={styles.keyboardFooterKey} onPress={() => handleKeyPress('?')}>
            <Text fontSize={18} fontWeight={500}>
              ?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardFooterKey} onPress={() => handleKeyPress('!')}>
            <Text fontSize={18} fontWeight={500}>
              !
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardFooterKey} onPress={() => handleKeyPress(',')}>
            <Text fontSize={18} fontWeight={500}>
              ,
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardFooterKey} onPress={() => handleKeyPress('.')}>
            <Text fontSize={18} fontWeight={500}>
              .
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardFooterKey} onPress={() => handleKeyPress(' ')}>
            <Text fontSize={18} fontWeight={500}>
              space
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardFooterKey} onPress={() => handleKeyPress('\n')}>
            <EnterIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardFooterKey} onPress={() => handleKeyPress('backspace')}>
            <BackspaceIcon />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    height: 250,
    position: 'absolute',
  },
  keyboardHead: {
    backgroundColor: Colors.greySuperLight,
  },
  keyboardHeadButton: {
    justifyContent: 'center',
    backgroundColor: Colors.greySuperLight,
    alignItems: 'center',
    width: 53,
    height: 46,
  },
  keyboardHeadButtonActive: {
    backgroundColor: Colors.green,
  },
  keyboardBody: {
    height: 250 - 46,
    backgroundColor: Colors.white,
  },
  emojiBoard: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  emojiKey: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardFooter: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 47,
    width: '100%',
    backgroundColor: Colors.white,
    elevation: 5,
    bottom: 0,
    left: 0,
  },
  keyboardFooterKey: {
    height: 33,
    minWidth: 33,
    paddingHorizontal: 11,
    backgroundColor: Colors.greySuperLight,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
