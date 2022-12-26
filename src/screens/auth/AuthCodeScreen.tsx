import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {Align, Text} from '../../base/components/Text';
import {useRootStore} from '../../base/hooks/useRootStore';
import Navigation from '../../base/Navigation';
import {Nullable} from '../../base/types/BaseTypes';
import {isEmpty} from '../../base/utils/baseUtil';
import {CodeInput} from '../../components/CodeInput';
import {Countdown} from '../../components/Countdown';
import {Colors} from '../../styles/Colors';

export const AuthCodeScreen = observer(() => {
  const {authStore} = useRootStore();
  const [canSendCode, setCanSendCode] = useState(true);

  const [confirm, setConfirm] =
    useState<Nullable<FirebaseAuthTypes.ConfirmationResult>>(null);

  const signInWithPhoneNumber = async (phoneNumber: string) => {
    const confirm = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirm);
  };

  const confirmCode = async (confirmCode: string) => {
    await confirm?.confirm(confirmCode);
  };

  useEffect(() => {
    if (
      !isEmpty(authStore.loginForm.phone) &&
      !isEmpty(authStore.loginForm.phoneCode)
    ) {
      signInWithPhoneNumber(
        `+${authStore.loginForm.phoneCode} ${authStore.loginForm.phone}`,
      );
    }
  }, []);

  const handleCodeChange = (code: string) => {
    if (code.length === 6) {
      confirmCode(code)
        .then(result => {
          console.log('Confirm code result', result);
        })
        .catch(error => {
          console.log('Confirm code error', error);
        });
    }
  };

  const handleWrongNumberPress = () => {
    Navigation.goBack();
  };

  const handleTimeout = () => {
    setCanSendCode(true);
  };

  const handleRefresh = () => {
    if (canSendCode) {
      setCanSendCode(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        align={Align.Center}
        fontSize={18}
        numberOfLines={1}
        fontWeight={700}
        color={Colors.green}
        style={styles.title}>
        Подтвердить + {authStore.loginForm.phoneCode}{' '}
        {authStore.loginForm.phone}
      </Text>
      <Text
        align={Align.Center}
        fontSize={13}
        fontWeight={500}
        color={Colors.grey}
        style={styles.subtitle}>
        Вам было отправлено SMS на номер{'\n'}
        <Text
          fontSize={13}
          fontWeight={500}
          color={Colors.grey}
          numberOfLines={1}>
          + {authStore.loginForm.phoneCode} {authStore.loginForm.phone}
        </Text>
        .{' '}
        <Text
          fontSize={13}
          fontWeight={500}
          color={Colors.blue}
          onPress={handleWrongNumberPress}>
          Неверный номер?
        </Text>
      </Text>
      <CodeInput maxLength={6} onChange={handleCodeChange} />
      <Countdown
        onTimeOut={handleTimeout}
        onRefresh={handleRefresh}
        delay={120}
        containerStyle={styles.countdown}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 36,
    paddingHorizontal: 38,
  },
  title: {
    marginBottom: 18,
  },
  subtitle: {
    marginBottom: 32,
  },
  countdown: {
    alignSelf: 'center',
    marginTop: 29,
  },
});
