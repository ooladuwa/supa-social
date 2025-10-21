import Icon from '@/assets/icons';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

const Login = () => {
  const router = useRouter();
  const emailRef = useRef<string>('');
  const passwordRef = useRef<string>('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      return Alert.alert(
        'Login Error',
        'Please enter your email and password',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ]
      );
    }

    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    console.log('error', error);
    if (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <ScreenWrapper>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* Welcome Text */}
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please login to continue
          </Text>
          {/* Email Input */}
          <Input
            icon={
              <Icon
                name='mail'
                size={26}
                strokeWidth={1.6}
              />
            }
            onChangeText={(value) => {
              emailRef.current = value;
            }}
            placeholder='Enter your email'
            keyboardType='email-address'
            autoCapitalize='none'
          />
          {/* Password Input */}
          <Input
            icon={
              <Icon
                name='lock'
                size={26}
                strokeWidth={1.6}
              />
            }
            onChangeText={(value) => {
              passwordRef.current = value;
            }}
            placeholder='Enter your password'
            secureTextEntry
            autoCapitalize='none'
          />
          {/* Forgot Password */}
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          {/* Login Button */}
          <Button
            title={'Login'}
            onPress={handleLogin}
            loading={loading}
          />
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&apos;t have an account?</Text>
            <Pressable onPress={() => router.push('/signup')}>
              <Text
                style={[
                  styles.footerText,
                  {
                    color: theme.colors.primaryDark,
                    fontWeight: theme.fonts.semibold,
                  },
                ]}
              >
                Sign up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
