import {FlashList, ListRenderItem} from '@shopify/flash-list';
import dayjs from 'dayjs';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Navigation from '../../../base/Navigation';
import {DataShower} from '../../../base/components/DataShower';
import {Text} from '../../../base/components/Text';
import {useRootStore} from '../../../base/hooks/useRootStore';
import {isEmpty, isTrue} from '../../../base/utils/baseUtil';
import {Avatar} from '../../../components/Avatar';
import ChatHelper from '../../../helpers/ChatHelper';
import {Chat} from '../../../modules/chat/models/Chat';
import {screens} from '../../../navigation/consts/screens';
import {Colors} from '../../../styles/Colors';
import {Center} from '../../../base/components/Center';
import {ChatTypes} from '../../../components/types/ChatTypes';

interface HomeMainProps {}

export const ChatsMainScreen = observer(({}: HomeMainProps) => {
  const {chatStore} = useRootStore();

  const privateChats = chatStore.chats.filter(
    chat => chat.type === ChatTypes.private,
  );

  const handleContactsItemPress = (id: string) => {
    Navigation.navigate(screens.CHATS_DETAIL, {
      id,
    });
  };

  const renderItem: ListRenderItem<Chat> = ({item}) => {
    const participants = ChatHelper.getParticipants(
      item.membersData,
      item.owner,
    );

    return (
      <TouchableOpacity
        style={styles.chatsItem}
        key={item.id}
        onPress={() => handleContactsItemPress(item.id!)}>
        <Avatar uri={item.image ?? participants[0].photoURL} />
        <View style={styles.chatsItemContent}>
          <View style={styles.chatsItemContentHead}>
            {!isEmpty(participants[0].displayName) && (
              <Text fontWeight={600} numberOfLines={1}>
                {participants[0].displayName!}
              </Text>
            )}
            {!isEmpty(item.lastMessage?.sentAt) && (
              <Text fontWeight={400} fontSize={10} color={Colors.grey}>
                {dayjs.unix(item.lastMessage?.sentAt?.seconds!).format('hh:mm')}
              </Text>
            )}
          </View>
          <View style={styles.chatsItemContentBody}>
            {!isEmpty(item.lastMessage?.content) && (
              <Text fontWeight={600}>{item.lastMessage?.content!}</Text>
            )}
            {!isEmpty(item.unreadCount) && item.unreadCount! > 0 && (
              <View style={styles.chatsItemContentBadge}>
                <Text fontWeight={600} fontSize={12} color={Colors.white}>
                  {item.unreadCount?.toString()}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DataShower loading={chatStore.loading}>
        {!isEmpty(privateChats) ? (
          <FlashList
            data={privateChats}
            renderItem={renderItem}
            estimatedItemSize={85}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Center>
            <Text fontSize={16} fontWeight={500} color={Colors.grey}>
              У вас пока нет чатов
            </Text>
          </Center>
        )}
        <LinearGradient
          style={styles.gradient}
          colors={[Colors.transparent, Colors.white]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        />
      </DataShower>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  chatsItem: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingTop: 18,
  },
  chatsItemContent: {
    flexGrow: 1,
    marginLeft: 12,
    paddingRight: 14,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLight,
  },
  chatsItemContentHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatsItemContentBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatsItemContentBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 20,
    backgroundColor: Colors.greyLight,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
});
