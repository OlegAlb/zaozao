import {observer} from 'mobx-react-lite';
import React from 'react';
import {StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Button, ButtonType} from '../../../base/components/Button';
import {Header} from '../../../base/components/Header';
import {Input} from '../../../base/components/Input';
import {Text} from '../../../base/components/Text';
import {useRootStore} from '../../../base/hooks/useRootStore';
import Navigation from '../../../base/Navigation';
import {isEmpty} from '../../../base/utils/baseUtil';
import {BackButton} from '../../../components/BackButton';
import {CreateGroupFormFields} from '../../../modules/chat/forms/CreateGroupForm';
import {screens} from '../../../navigation/consts/screens';
import {Colors} from '../../../styles/Colors';

export const GroupsCreateScreen = observer(() => {
  const {chatStore} = useRootStore();

  const handleNameInput = (name: string) => {
    chatStore.changeCreateGroupForm(CreateGroupFormFields.name, name);
  };

  const handleCancelPress = () => {
    chatStore.changeCreateGroupForm(CreateGroupFormFields.name, '');
    Navigation.goBack();
  };

  const handleNextPress = () => {
    Navigation.navigate(screens.GROUPS_ADD_PARTICIPANTS);
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <Header
        leftComponent={<BackButton />}
        centerComponent={
          <Text fontWeight={600} color={Colors.white} fontSize={18}>
            Создать группу
          </Text>
        }
      />
      <View style={styles.container}>
        <Text fontWeight={500} color={Colors.black} fontSize={16}>
          Введите название группы
        </Text>
        <Input
          value={chatStore.createGroupForm.name}
          onChangeText={handleNameInput}
          rightComponent={
            <Text fontWeight={500}>
              {chatStore.createGroupForm.name?.length?.toString()}
            </Text>
          }
        />
      </View>
      <View style={styles.controls}>
        <Button
          title="Отмена"
          onPress={handleCancelPress}
          type={ButtonType.Secondary}
          style={styles.button}
        />
        <Button
          title="Далее"
          disabled={isEmpty(chatStore.createGroupForm.name)}
          onPress={handleNextPress}
          type={ButtonType.Secondary}
          textColor={Colors.green}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    paddingVertical: 28,
    paddingHorizontal: 15,
  },
  controls: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  button: {
    flex: 1,
  },
});
