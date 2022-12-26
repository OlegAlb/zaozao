import {observer} from 'mobx-react-lite';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import Navigation from '../../base/Navigation';
import {Button} from '../../base/components/Button';
import {Align, Text} from '../../base/components/Text';
import {LogoSm} from '../../components/icons/LogoSm';
import {screens} from '../../navigation/consts/screens';
import {Colors} from '../../styles/Colors';

export const AuthStartScreen = observer(() => {
  const handlePolicyPress = () => {};

  const handleConfirmPress = () => {
    Navigation.navigate(screens.AUTH_PHONE);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <View style={styles.title}>
        <Text fontSize={18} fontWeight={700} color={Colors.green}>
          Добро пожаловать в{' '}
        </Text>
        <LogoSm />
      </View>
      <Text align={Align.Center} fontSize={13} color={Colors.grey}>
        Ознакомьтесь с нашей{' '}
        <Text fontSize={13} color={Colors.blue} onPress={handlePolicyPress}>
          политикой конфиденциальности
        </Text>
        . Нажмите “Принять и продолжить”, чтобы принять условия предоставления
        услуг.
      </Text>
      <Button
        title="Принять и продолжить"
        style={styles.button}
        onPress={handleConfirmPress}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  title: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    marginTop: 27,
  },
});
