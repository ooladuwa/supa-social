import Button from '@/components/Button';
import ScreenWrapper from '@/components/ScreenWrapper';
import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const Welcome: React.FC = () => {
  const router = useRouter();

  return (
    <ScreenWrapper bgColor='white'>
      <StatusBar style='dark' />
      <View style={styles.container}>
        {/* Welcome Image */}
        <Image
          style={styles.welcomeImage}
          resizeMode='contain'
          source={require('@/assets/images/welcome.png')}
        />
        {/* Welcome Text */}
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>LinkUp!</Text>
          <Text style={styles.description}>
            Where every thought finds a home and every image tells a story.
          </Text>
        </View>
        {/* Welcome Button Footer */}
        <View style={styles.footer}>
          <Button
            title='Get Started'
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => router.push('/signup')}
          />
        </View>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Pressable onPress={() => router.push('/login')}>
            <Text
              style={[
                styles.loginText,
                {
                  color: theme.colors.primaryDark,
                  fontWeight: theme.fonts.semibold,
                },
              ]}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: wp(4),
  },
  welcomeImage: {
    width: wp(100),
    height: hp(30),
    alignSelf: 'center',
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fonts.extraBold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  description: {
    fontSize: hp(1.7),
    paddingHorizontal: wp(10),
    color: theme.colors.text,
    textAlign: 'center',
  },
  footer: {
    gap: 30,
    width: '100%',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  loginText: {
    textAlign: 'center',
    fontSize: hp(1.6),
    color: theme.colors.text,
  },
});
