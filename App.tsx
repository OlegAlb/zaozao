import {observer} from 'mobx-react-lite';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Host} from 'react-native-portalize';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import 'reflect-metadata';

import Navigator from './src/navigation/Navigator';

enableScreens();

const App = observer(() => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Host>
        <Navigator />
      </Host>
    </SafeAreaProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
