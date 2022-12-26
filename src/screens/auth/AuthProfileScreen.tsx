import { observer } from 'mobx-react-lite';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Asset } from 'react-native-image-picker';

import Navigation from '../../base/Navigation';
import { Button } from '../../base/components/Button';
import { ImageInput } from '../../base/components/ImageInput';
import { Input } from '../../base/components/Input';
import { Align, Text } from '../../base/components/Text';
import { useRootStore } from '../../base/hooks/useRootStore';
import { AuthProfileFormFields } from '../../modules/profile/forms/AuthProfileForm';
import { screens } from '../../navigation/consts/screens';
import { Colors } from '../../styles/Colors';

export const AuthProfileScreen = observer(() => {
  const { fileStore, profileStore } = useRootStore();

  const handleSubmit = () => {
    profileStore.submitAuthProfile().then(() => {
      Navigation.replace(screens.MAIN_APP, { screen: screens.CHATS_MAIN });
    });
  };

  const handleDisplayNameInput = (displayName: string) => {
    profileStore.changeAuthProfileForm(AuthProfileFormFields.displayName, displayName);
  };

  const handleImageChange = async (file: Asset) => {
    const photoURL = await fileStore.uploadFile(file, `/profilePicture/${profileStore.profile?.id}/${file.fileName}`);
    profileStore.changeAuthProfileForm(AuthProfileFormFields.photoURL, photoURL);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Text fontWeight={700} fontSize={18} color={Colors.green} align={Align.Center}>
        Профиль
      </Text>
      <Text fontWeight={500} fontSize={13} color={Colors.grey} align={Align.Center} style={styles.subtitle}>
        Введите свое имя и при желинии установите фото профиля.
      </Text>
      <ImageInput
        loading={fileStore.fileLoader}
        style={styles.imageInput}
        uri={fileStore.fileUri}
        onEditPress={handleImageChange}
      />
      <Input
        style={styles.input}
        value={profileStore.authProfileForm.displayName}
        onChangeText={handleDisplayNameInput}
        rightComponent={<Text fontWeight={500}>{profileStore.authProfileForm?.displayName?.length?.toString()}</Text>}
      />
      <Button
        style={styles.button}
        title="Готово"
        disabled={!profileStore.authProfileForm.isFormValid()}
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 38,
    paddingHorizontal: 28,
    backgroundColor: Colors.white,
  },
  subtitle: {
    marginTop: 18,
  },
  input: {
    marginTop: 20,
  },
  imageInput: {
    marginTop: 20,
  },
  button: {
    marginTop: 36,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
