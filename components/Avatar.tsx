import { theme } from '@/constants/theme';
import { hp } from '@/helpers/common';
import { getUserImageSrc } from '@/services/imageService';
import { Image } from 'expo-image';
import { ImageStyle, StyleProp, StyleSheet, View } from 'react-native';

interface AvatarProps {
  uri: string;
  size?: number;
  rounded?: number;
  style?: StyleProp<ImageStyle>;
}

const Avatar = ({
  uri,
  size = hp(4.5),
  rounded = theme.radius.md,
  style,
}: AvatarProps) => {
  return (
    <View>
      <Image
        source={getUserImageSrc(uri)}
        transition={100}
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: rounded },
          style,
        ]}
      />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderCurve: 'continuous',
    borderColor: theme.colors.darkLight,
    borderWidth: 1,
  },
});
