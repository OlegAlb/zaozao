import React from 'react';
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';

import { CameraIcon } from '../../components/icons/CameraIcon';
import { Colors } from '../../styles/Colors';
import { Nullable } from '../types/BaseTypes';
import { Loader } from './Loader';

interface ImageInputProps {
  uri?: Nullable<string>;
  loading?: boolean;
  style?: ViewStyle;
  onEditPress?: (result: Asset) => void;
}

export const ImageInput = ({ uri, style, loading, onEditPress }: ImageInputProps) => {
  const handleEditPress = async () => {
    const { assets } = await launchImageLibrary({ mediaType: 'photo' });

    if (assets) {
      onEditPress?.(assets[0]);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <Loader size={'small'} />;
    } else {
      return uri ? <Image source={{ uri }} style={styles.imageInput} /> : <CameraIcon />;
    }
  };

  return (
    <TouchableOpacity style={[styles.imageInputWrap, style]} onPress={handleEditPress}>
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageInputWrap: {
    width: 73,
    height: 73,
    backgroundColor: Colors.greySuperLight,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 73 / 2,
    overflow: 'hidden',
  },
  imageInput: {
    width: 73,
    height: 73,
    resizeMode: 'cover',
  },
});
