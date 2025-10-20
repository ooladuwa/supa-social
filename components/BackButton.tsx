import Icon from '@/assets/icons';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface BackButtonProps {
  router: ReturnType<typeof useRouter>;
  size?: number;
}
const BackButton = ({ router, size }: BackButtonProps) => {
  return (
    <Pressable
      onPress={() => router.back()}
      style={styles.button}
    >
      <Icon
        name='arrowLeft'
        strokeWidth={2.5}
        size={size || 26}
        color={theme.colors.text}
      />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    padding: 5,
  },
});
