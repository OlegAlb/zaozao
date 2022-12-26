import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import { Text } from '../base/components/Text';
import { Colors } from '../styles/Colors';

interface ICountdownProps {
  delay?: number;
  onTimeOut?: () => void;
  onRefresh?: () => void;
  containerStyle?: ViewStyle;
}

dayjs.extend(duration);

export const Countdown = ({ delay = 60, onTimeOut, onRefresh, containerStyle }: ICountdownProps) => {
  const [currentTime, setCurrentTime] = useState(delay);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentTime > 0) {
        setCurrentTime(currentTime - 1);
      }

      if (currentTime === 0) {
        onTimeOut?.();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentTime]);

  return (
    <View style={[styles.contanier, containerStyle]}>
      <Text color={Colors.green} fontWeight={600} fontSize={16} style={styles.countdown}>
        {dayjs.duration(currentTime, 's').format('mm:ss')}
      </Text>
      {onRefresh && (
        <Text
          fontWeight={600}
          fontSize={16}
          color={Colors.grey}
          onPress={() => {
            setCurrentTime(delay);
            onRefresh();
          }}
        >
          Отправить снова
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    alignItems: 'center',
  },
  countdown: {
    marginBottom: 4,
  },
});
