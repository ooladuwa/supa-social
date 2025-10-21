import { theme } from '@/constants/theme';
import { hp } from '@/helpers/common';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from './BackButton';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  mb?: number;
}

const Header = ({ title, showBackButton = true, mb = 10 }: HeaderProps) => {
  const router = useRouter();
  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showBackButton && (
        <View style={styles.backButton}>
          <BackButton router={router} />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    gap: 10,
  },
  backButton: { position: 'absolute', left: 0 },
  title: {
    fontSize: hp(2.7),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textDark,
  },
});
