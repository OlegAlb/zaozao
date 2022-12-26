import {FlashList, ListRenderItem} from '@shopify/flash-list';
import dayjs from 'dayjs';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Center} from '../../../base/components/Center';
import {DataShower} from '../../../base/components/DataShower';
import {Text} from '../../../base/components/Text';
import {useRootStore} from '../../../base/hooks/useRootStore';
import Navigation from '../../../base/Navigation';
import {isEmpty} from '../../../base/utils/baseUtil';
import {Avatar} from '../../../components/Avatar';
import {ChatTypes} from '../../../components/types/ChatTypes';
import ChatHelper from '../../../helpers/ChatHelper';
import {Chat} from '../../../modules/chat/models/Chat';
import {screens} from '../../../navigation/consts/screens';
import {Colors} from '../../../styles/Colors';

export const GroupsMainScreen = observer(() => {
  const {chatStore} = useRootStore();

  const groupChats = chatStore.chats.filter(
    chat => chat.type === ChatTypes.group,
  );

  const handleContactsItemPress = (id: string) => {
    Navigation.navigate(screens.GROUPS_DETAIL, {
      id,
    });
  };

  const renderItem: ListRenderItem<Chat> = ({item}) => {
    const participants = ChatHelper.getParticipants(
      item.membersData,
      item.owner,
    );

    const displayName =
      item.name ??
      participants.map(participant => participant.displayName).join(', ');

    return (
      <TouchableOpacity
        style={styles.chatsItem}
        key={item.id}
        onPress={() => handleContactsItemPress(item.id!)}>
        <Avatar uri={item.image} />
        <View style={styles.chatsItemContent}>
          <View style={styles.chatsItemContentHead}>
            {!isEmpty(displayName) && (
              <Text fontWeight={600}>{displayName}</Text>
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
        {!isEmpty(groupChats) ? (
          <FlashList
            data={groupChats}
            renderItem={renderItem}
            estimatedItemSize={85}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Center>
            <Text fontSize={16} fontWeight={500} color={Colors.grey}>
              У вас пока нет групповых чатов
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
