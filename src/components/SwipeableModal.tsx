import React from 'react';
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { IHandles } from 'react-native-modalize/lib/options';
import { Portal } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ISwipeableModalProps {
  children: JSX.Element | JSX.Element[];
  modalizeRef: React.RefObject<IHandles>;
  fullScreen?: boolean;
  onClose?: () => void;
}

export const SwipeableModal = (props: ISwipeableModalProps) => {
  const { children, modalizeRef, fullScreen, onClose } = props;

  const insets = useSafeAreaInsets();

  const handleModalClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        modalStyle={fullScreen ? { ...styles.modal, marginTop: insets.top } : {}}
        withHandle={false}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          contentContainerStyle: fullScreen ? { height: '100%', paddingBottom: insets.top } : {},
        }}
        closeOnOverlayTap
        tapGestureEnabled
        adjustToContentHeight={!fullScreen ? true : undefined}
        disableScrollIfPossible={false}
        panGestureComponentEnabled
        onClose={handleModalClose}
      >
        {children}
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    minHeight: '100%',
  },
});
