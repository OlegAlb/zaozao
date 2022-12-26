import React, {useMemo} from 'react';
import {View, StyleSheet, Image, ImageURISource} from 'react-native';

import {appConfig} from '../appConfig';
import {Nullable} from '../base/types/BaseTypes';
import {Colors} from '../styles/Colors';
import {UserIcon} from './icons/UserIcon';
import {UserIconSm} from './icons/UserIconSm';
import {IconSize} from './icons/types/Icon';
import {PlusIcon} from './icons/PlusIcon';

interface AvatarProps {
  uri: Nullable<ImageURISource['uri']>;
  online?: boolean;
  color?: string;
  size?: IconSize;
  addIcon?: boolean;
  bordered?: boolean;
}

export const Avatar = ({
  uri,
  online,
  color,
  size,
  bordered,
  addIcon,
}: AvatarProps) => {
  const icon = useMemo(() => {
    switch (size) {
      case IconSize.small:
        return <UserIconSm color={color} />;
      case IconSize.normal:
      default:
        return <UserIcon color={color} />;
    }
  }, [size]);

  return (
    <View>
      {uri ? (
        <Image
          source={{uri}}
          style={[styles.avatar, bordered && styles.bordered]}
        />
      ) : (
        icon
      )}
      {online && <View style={styles.onlineMark} />}
      {addIcon && (
        <View style={styles.addMark}>
          <PlusIcon />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 43 / 2,
  },
  bordered: {
    borderWidth: 2,
    borderColor: Colors.white,
  },
  onlineMark: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: Colors.green,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.white,
  },
  addMark: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    backgroundColor: Colors.green,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
