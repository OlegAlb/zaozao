import {observer} from 'mobx-react-lite';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from '../../../base/components/Button';
import {Center} from '../../../base/components/Center';
import {Checkbox} from '../../../base/components/Checkbox';
import {Header} from '../../../base/components/Header';
import {Align, Text} from '../../../base/components/Text';
import {TitledCheckbox} from '../../../base/components/TitledCheckbox';
import {useRootStore} from '../../../base/hooks/useRootStore';
import Navigation from '../../../base/Navigation';
import {isEmpty, isTrue} from '../../../base/utils/baseUtil';
import {Avatar} from '../../../components/Avatar';
import {BackButton} from '../../../components/BackButton';
import {CheckIcon} from '../../../components/icons/CheckIcon';
import ArrayHelper from '../../../helpers/ArrayHelper';
import {CreateGroupFormFields} from '../../../modules/chat/forms/CreateGroupForm';
import {User} from '../../../modules/common/models/User';
import {screens} from '../../../navigation/consts/screens';
import {Colors} from '../../../styles/Colors';

export const GroupsAddParticipantsScreen = observer(() => {
  const {chatStore, contactsStore, profileStore} = useRootStore();

  const handeRequestPermissionPress = () => {
    contactsStore.requestPermission();
  };

  const handleCheckAllChange = () => {
    if (isEmpty(chatStore.createGroupForm.membersIds)) {
      const ids = ArrayHelper.extract(contactsStore.contacts, 'id');

      chatStore.changeCreateGroupForm(CreateGroupFormFields.membersIds, ids);
      chatStore.changeCreateGroupForm(
        CreateGroupFormFields.membersData,
        contactsStore.contacts,
      );
    } else {
      chatStore.changeCreateGroupForm(CreateGroupFormFields.membersIds, []);
      chatStore.changeCreateGroupForm(CreateGroupFormFields.membersData, []);
    }
  };

  const handleContactsItemPress = (user: User) => {
    let ids, users;
    if (chatStore.createGroupForm.membersIds.includes(user.id!)) {
      ids = ArrayHelper.remove(chatStore.createGroupForm.membersIds, user.id!);
      users = ArrayHelper.removeBy(
        chatStore.createGroupForm.membersData,
        'id',
        user.id!,
      );
    } else {
      ids = ArrayHelper.add(chatStore.createGroupForm.membersIds, user.id!);
      users = ArrayHelper.add(chatStore.createGroupForm.membersData, user);
    }

    chatStore.changeCreateGroupForm(CreateGroupFormFields.membersIds, ids);
    chatStore.changeCreateGroupForm(CreateGroupFormFields.membersData, users);
  };

  const handleConfirmPress = async () => {
    await chatStore.createGroup(profileStore.profile!);

    if (chatStore.currentChat) {
      Navigation.replace(screens.MAIN_APP);
    }
  };

  const renderItem: ListRenderItem<User> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleContactsItemPress(item)}
        style={styles.contactsItem}>
        <Avatar uri={item.photoURL} online={item.isOnline!} />
        <View style={styles.contactsItemContent}>
          <View>
            {!isEmpty(item.displayName) && (
              <Text fontWeight={600}>{item.displayName!}</Text>
            )}
            {!isEmpty(item.status) && (
              <Text fontWeight={500}>{item.status!}</Text>
            )}
          </View>
          <Checkbox
            value={isTrue(
              chatStore.createGroupForm.membersIds.includes(item.id!),
            )}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <Header
        leftComponent={<BackButton />}
        centerComponent={
          <Text fontWeight={600} color={Colors.white} fontSize={18}>
            Добавить участников
          </Text>
        }
      />
      {contactsStore.permissionGranted ? (
        <>
          {!isEmpty(contactsStore.contacts) ? (
            <>
              <View style={styles.contactsHead}>
                <TitledCheckbox
                  title="Выбрать всех"
                  onChange={handleCheckAllChange}
                  value={
                    chatStore.createGroupForm.membersData.length ===
                    contactsStore.contacts.length
                  }
                />
              </View>
              <FlatList
                contentContainerStyle={styles.contacts}
                data={contactsStore.contacts}
                renderItem={renderItem}
              />
            </>
          ) : (
            <Center>
              <Text fontSize={16} fontWeight={500} color={Colors.grey}>
                Контакты не найдены
              </Text>
            </Center>
          )}
          <LinearGradient
            style={styles.gradient}
            colors={[Colors.transparent, Colors.white]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
        </>
      ) : (
        <Center padding={16}>
          <Text
            fontSize={16}
            fontWeight={500}
            align={Align.Center}
            color={Colors.grey}>
            Для просмотра контактов нужно разрешить к ним доступ
          </Text>
          <Button
            onPress={handeRequestPermissionPress}
            style={styles.permissionsButton}
            title="Разрешить"
          />
        </Center>
      )}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmPress}>
        <CheckIcon />
      </TouchableOpacity>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contactsHead: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
  },
  contacts: {
    paddingTop: 14,
  },
  contactsItem: {
    flexDirection: 'row',
    paddingLeft: 12,
  },
  contactsItemContent: {
    flexGrow: 1,
    marginLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  confirmButton: {
    position: 'absolute',
    bottom: 27,
    right: 21,
    width: 56,
    height: 56,
    borderRadius: 58,
    backgroundColor: Colors.green,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.darkShadow,
  },
  permissionsButton: {
    marginTop: 16,
  },
});
