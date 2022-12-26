import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
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
import {Align, Text} from '../../../base/components/Text';
import {useRootStore} from '../../../base/hooks/useRootStore';
import Navigation from '../../../base/Navigation';
import {isEmpty} from '../../../base/utils/baseUtil';
import {Avatar} from '../../../components/Avatar';
import {User} from '../../../modules/common/models/User';
import {screens} from '../../../navigation/consts/screens';
import {Colors} from '../../../styles/Colors';

export const ContactsMainScreen = observer(() => {
  const {contactsStore} = useRootStore();

  const handleContactsItemPress = (id: string) => {
    Navigation.navigate(screens.CONTACTS_DETAIL, {
      id,
    });
  };

  const handeRequestPermissionPress = () => {
    contactsStore.requestPermission();
  };

  const renderItem: ListRenderItem<User> = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.contactsItem}
        key={item.id}
        onPress={() => handleContactsItemPress(item.id!)}>
        <Avatar uri={item.photoURL} online={item.isOnline!} />
        <View style={styles.contactsItemContent}>
          {!isEmpty(item.displayName) && (
            <Text fontWeight={600}>{item.displayName!}</Text>
          )}
          {!isEmpty(item.status) && (
            <Text fontWeight={500}>{item.status!}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {contactsStore.permissionGranted ? (
        <>
          <FlatList
            contentContainerStyle={styles.contacts}
            data={contactsStore.contacts}
            renderItem={renderItem}
          />
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
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contacts: {
    flex: 1,
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
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  permissionsButton: {
    marginTop: 16,
  },
});
