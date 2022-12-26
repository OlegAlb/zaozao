import { useFocusEffect, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { appConfig } from '../../../appConfig';
import Navigation from '../../../base/Navigation';
import { Center } from '../../../base/components/Center';
import { DataShower } from '../../../base/components/DataShower';
import { Header } from '../../../base/components/Header';
import { Row } from '../../../base/components/Row';
import { Switch } from '../../../base/components/Switch';
import { Text } from '../../../base/components/Text';
import { useRootStore } from '../../../base/hooks/useRootStore';
import { isEmpty, isTrue } from '../../../base/utils/baseUtil';
import { BackButton } from '../../../components/BackButton';
import { BanIcon } from '../../../components/icons/BanIcon';
import { ChatIcon } from '../../../components/icons/ChatIcon';
import { CheckIcon } from '../../../components/icons/CheckIcon';
import { DeleteIcon } from '../../../components/icons/DeleteIcon';
import { screens } from '../../../navigation/consts/screens';
import { ContactsDetailRouteProps } from '../../../navigation/types/ContactsStackTypes';
import { Colors } from '../../../styles/Colors';

interface SecondDetailProps {}

export const ContactsDetailScreen = observer(({}: SecondDetailProps) => {
  const { contactsStore, profileStore, chatStore } = useRootStore();
  const { params } = useRoute<ContactsDetailRouteProps>();

  useFocusEffect(
    useCallback(() => {
      contactsStore.getCurrentContact(params.id);
      chatStore.getChatByPrticipant(params.id);

      return () => {
        contactsStore.resetCurrentContact();
      };
    }, []),
  );

  const handleChatButtonPress = async () => {
    if (!chatStore.currentChat && !isEmpty(profileStore.profile) && !isEmpty(contactsStore.currentContact)) {
      chatStore.createChat(profileStore.profile!, contactsStore.currentContact!);
    }

    Navigation.navigate(screens.CHATS_DETAIL, {
      id: chatStore.currentChat?.id,
    });
  };

  const handleBanPress = () => {
    if (!profileStore.profile?.bannedList.includes(contactsStore.currentContact?.id!)) {
      profileStore.banContact(contactsStore.currentContact?.id!);
    } else {
      profileStore.unbanContact(contactsStore.currentContact?.id!);
    }
  };

  const handleDeletePress = () => {
    if (contactsStore.currentContact?.phoneNumber) {
      contactsStore.deleteContact(contactsStore.currentContact?.phoneNumber);
    }
  };

  const handleMute = (value: boolean) => {
    if (value) {
      profileStore.muteContact(contactsStore.currentContact?.id!);
    } else {
      profileStore.unmuteContact(contactsStore.currentContact?.id!);
    }
  };

  return (
    <>
      <Header
        backgroundColor={Colors.transparent}
        floating
        leftComponent={<BackButton backgroundColor={Colors.transparentBlack} borderColor={Colors.transparentBlack} />}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {!isEmpty(contactsStore.currentContact?.photoURL) ? (
            <Image
              style={styles.image}
              source={{ uri: appConfig.filestoragePath + contactsStore.currentContact?.photoURL! + '?alt=media' }}
            />
          ) : (
            <View style={styles.image} />
          )}
          <View style={styles.titleSection}>
            {!isEmpty(contactsStore.currentContact?.displayName) && (
              <Text fontWeight={600} fontSize={22} color={Colors.white}>
                {contactsStore.currentContact?.displayName!}
              </Text>
            )}
            {!isEmpty(contactsStore.currentContact?.isOnline) &&
              (isTrue(contactsStore.currentContact?.isOnline) ? (
                <Text fontWeight={600} fontSize={22} color={Colors.white}>
                  Онлайн
                </Text>
              ) : (
                !isEmpty(contactsStore.currentContact?.lastOnline) && (
                  <Text fontWeight={500} fontSize={12} color={Colors.white}>
                    Был(а) онлайн в {dayjs.unix(contactsStore.currentContact?.lastOnline!).format('hh:mm')}
                  </Text>
                )
              ))}
          </View>
        </View>
        <DataShower loading={contactsStore.currentLoading}>
          {!isEmpty(contactsStore.currentContact) ? (
            <>
              <View style={styles.section}>
                <Row justifyContent="space-between">
                  <Text fontWeight={500}>Без звука</Text>
                  <Switch
                    active={isTrue(profileStore.profile?.mutedList.includes(contactsStore.currentContact?.id!))}
                    onValueChange={handleMute}
                  />
                </Row>
              </View>
              <View style={styles.sectionDivider} />
              <View style={styles.section}>
                <Text fontWeight={500} fontSize={13} color={Colors.green} style={styles.sectionTitle}>
                  Статус и номер телефона
                </Text>
                {!isEmpty(contactsStore.currentContact?.status) &&
                  !isEmpty(contactsStore.currentContact?.statusUpdated) && (
                    <>
                      <Text fontWeight={500}>{contactsStore.currentContact?.status!}</Text>
                      <Text fontWeight={500} fontSize={13} color={Colors.grey}>
                        {dayjs.unix(contactsStore.currentContact?.statusUpdated!).locale('ru').format('DD MMMM YYYY')}
                      </Text>
                    </>
                  )}
                {!isEmpty(contactsStore.currentContact?.phoneNumber) && (
                  <Row justifyContent="space-between">
                    <View>
                      <Text fontWeight={500}>{contactsStore.currentContact?.phoneNumber!}</Text>
                      <Text fontWeight={500} fontSize={13} color={Colors.grey}>
                        Мобильн.
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleChatButtonPress()}>
                      <ChatIcon />
                    </TouchableOpacity>
                  </Row>
                )}
              </View>
              <View style={styles.sectionDivider} />
              <TouchableOpacity style={styles.section} onPress={handleBanPress}>
                <Row spacing={20}>
                  <View>
                    {!profileStore.profile?.bannedList.includes(contactsStore.currentContact?.id!) ? (
                      <BanIcon />
                    ) : (
                      <CheckIcon color={Colors.green} width={20} />
                    )}
                  </View>
                  {!profileStore.profile?.bannedList.includes(contactsStore.currentContact?.id!) ? (
                    <Text fontWeight={500}>Заблокировать</Text>
                  ) : (
                    <Text fontWeight={500}>Разблокировать</Text>
                  )}
                </Row>
              </TouchableOpacity>
              <View style={styles.sectionDivider} />
              <TouchableOpacity style={styles.section} onPress={handleDeletePress}>
                <Row spacing={20}>
                  <View>
                    <DeleteIcon />
                  </View>
                  <Text fontWeight={500}>Удалить контакт</Text>
                </Row>
              </TouchableOpacity>
              <View style={styles.sectionDivider} />
            </>
          ) : (
            <Center>
              <Text color={Colors.grey} fontWeight={500}>
                Контакт не найден
              </Text>
            </Center>
          )}
        </DataShower>
      </ScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerContent: {
    flex: 1,
  },
  titleSection: {
    position: 'absolute',
    bottom: 13,
    left: 16,
  },
  image: {
    height: 300,
    backgroundColor: Colors.greyLight,
    resizeMode: 'cover',
  },
  section: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: Colors.greyLight,
  },
  sectionTitle: {
    marginBottom: 20,
  },
});
