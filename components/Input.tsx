import { theme } from '@/constants/theme';
import { hp } from '@/helpers/common';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface InputProps extends TextInputProps {
  containerStyles?: StyleProp<ViewStyle>;
  placeholderTextColor?: string;
  icon?: React.ReactNode;
  inputRef?: React.RefObject<TextInput>;
}

const Input = ({
  containerStyles,
  placeholderTextColor,
  inputRef,
  icon,
  ...rest
}: InputProps) => {
  return (
    <View style={[styles.container, containerStyles && containerStyles]}>
      {icon}
      <TextInput
        style={{ flex: 1 }}
        placeholderTextColor={placeholderTextColor || theme.colors.textLight}
        ref={inputRef && inputRef}
        {...rest}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(7.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous',
    paddingHorizontal: 18,
    gap: 12,
  },
});
