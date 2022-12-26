import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import countries from '../../assets/data/countries.json';
import Navigation from '../../base/Navigation';
import { Button } from '../../base/components/Button';
import { Input } from '../../base/components/Input';
import { MaskedInput } from '../../base/components/MaskedInput';
import { Select } from '../../base/components/Select';
import { Align, Text } from '../../base/components/Text';
import { ISelectOption } from '../../base/components/types/Select';
import { useRootStore } from '../../base/hooks/useRootStore';
import { LoginFormFields } from '../../modules/auth/forms/LoginFrom';
import { screens } from '../../navigation/consts/screens';
import { Colors } from '../../styles/Colors';

export const AuthPhoneScreen = observer(() => {
  const { authStore, langStore } = useRootStore();

  useEffect(() => {
    const currentCountry = countries.find(country => country.countryCode === langStore.lang);

    if (currentCountry) {
      authStore.changeLoginForm(LoginFormFields.phoneCode, currentCountry.phoneCode);
      authStore.changeLoginForm(LoginFormFields.countryCode, currentCountry.countryCode);
      authStore.changeLoginForm(LoginFormFields.countryName, currentCountry.name);
    }
  }, []);

  const handleNavigation = () => {
    if (authStore.loginForm.isFormValid()) {
      Navigation.navigate(screens.AUTH_CODE);
    }
  };

  const handleSelect = (data: ISelectOption['data']) => {
    authStore.changeLoginForm(LoginFormFields.phoneCode, data.phoneCode);
    authStore.changeLoginForm(LoginFormFields.countryCode, data.countryCode);
    authStore.changeLoginForm(LoginFormFields.countryName, data.name);
  };

  const handlePhoneInput = (phone: string) => {
    authStore.changeLoginForm(LoginFormFields.phone, phone);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <Text align={Align.Center} fontSize={18} fontWeight={700} color={Colors.green} style={styles.title}>
        Подтверждение номера
      </Text>
      <Text align={Align.Center} fontSize={13} fontWeight={500} color={Colors.grey}>
        Мы отправим вам SMS-сообщение (мобильный оператор может взимать плату), чтобы подтвердить ваш номер телефона.
        Введите код страны и номер телефона:
      </Text>
      <Select
        onSelect={handleSelect}
        options={countries.map(country => ({ title: country.name, data: country }))}
        title={'Выберите страну'}
        placeholder={'Выберите страну'}
        value={authStore.loginForm.countryName}
      />
      <View style={styles.phone}>
        <Input
          value={authStore.loginForm.phoneCode}
          containerStyle={styles.phoneCode}
          leftComponent={
            <Text fontWeight={700} fontSize={16} color={Colors.grey}>
              +
            </Text>
          }
          disabled
        />
        <MaskedInput
          type="custom"
          options={{
            mask: '(999) 999 99 99',
          }}
          maxLength={15}
          value={authStore.loginForm.phone}
          onChangeText={handlePhoneInput}
          keyboardType="numeric"
        />
      </View>
      <Button
        style={styles.button}
        title="Далее"
        disabled={!authStore.loginForm.isFormValid()}
        onPress={handleNavigation}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 28,
  },
  title: {
    marginBottom: 18,
  },
  option: {
    padding: 16,
  },
  phone: {
    flexDirection: 'row',
  },
  phoneCode: {
    width: 73,
    marginRight: 24,
    flex: 0,
  },
  button: {
    marginTop: 31,
  },
});
