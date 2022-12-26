import React from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IKeyboardViewProps {
  children: JSX.Element[] | JSX.Element;
  isScroll?: boolean;
}

export const KeyboardView = ({ children, isScroll = false }: IKeyboardViewProps) => {
  const insets = useSafeAreaInsets();

  if (isScroll) {
    if (Platform.OS === 'android') {
      return (
        <ScrollView
          contentContainerStyle={[
            styles.scrollView,
            {
              paddingBottom: 16 + insets.bottom,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      );
    }

    return (
      <KeyboardAvoidingView style={styles.containerScroll} keyboardVerticalOffset={0} behavior="padding">
        <ScrollView
          contentContainerStyle={[
            styles.scrollView,
            {
              paddingBottom: 16 + insets.bottom,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  if (Platform.OS === 'android') {
    return (
      <View
        style={[
          styles.container,
          {
            marginBottom: 16 + insets.bottom,
          },
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={55 + insets.top + StatusBar.currentHeight!}
      behavior="padding"
      style={[styles.container, { marginBottom: 16 + insets.bottom }]}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
