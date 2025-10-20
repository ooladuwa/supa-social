import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScreenWrapper = ({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor?: string | undefined;
}) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View style={{ flex: 1, paddingTop, backgroundColor: bgColor }}>
      {children}
    </View>
  );
};

export default ScreenWrapper;
