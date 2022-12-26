import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { appConfig } from '../../appConfig';
import Navigation from '../../base/Navigation';
import { useRootStore } from '../../base/hooks/useRootStore';
import { LogoLg } from '../../components/icons/LogoLg';
import { User } from '../../modules/common/models/User';
import { screens } from '../../navigation/consts/screens';
import { Stacks } from '../../navigation/consts/stacks';
import { Colors } from '../../styles/Colors';

export const SplashScreen = observer(() => {
  const { langStore, profileStore } = useRootStore();

  useEffect(() => {
    const init = async () => {
      await langStore.sync();

      setTimeout(async () => {
        return auth().onAuthStateChanged(async authuser => {
          if (authuser) {
            const database = firebase.app().database(appConfig.databasePath);
            const reference = database.ref(`/status/${auth().currentUser?.uid}`);

            const isOfflineForDatabase = {
              isOnline: false,
              lastOnline: database.getServerTime().getTime(),
            };
            const isOnlineForDatabase = {
              isOnline: true,
              lastOnline: database.getServerTime().getTime(),
            };

            database.ref('.info/connected').on('value', snapshot => {
              if (snapshot.val() === false) return;

              reference
                .onDisconnect()
                .set(isOfflineForDatabase)
                .then(() => {
                  reference.set(isOnlineForDatabase);
                });
            });

            const profile = await profileStore.editProfile({
              id: authuser.uid,
              phoneNumber: authuser.phoneNumber,
              displayName: authuser.displayName,
              photoURL: authuser.photoURL,
            } as User);

            if (!profileStore?.profile?.displayName) {
              Navigation.replace(Stacks.AUTH_STACK, { screen: screens.AUTH_PROFILE });
            } else {
              Navigation.replace(screens.MAIN_APP);
            }
          } else {
            Navigation.replace(Stacks.AUTH_STACK, { screen: screens.AUTH_START });
          }
        });
      }, 1000);
    };

    init();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <LogoLg />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
