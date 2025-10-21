import Icon from '@/assets/icons';
import Avatar from '@/components/Avatar';
import Header from '@/components/Header';
import ScreenWrapper from '@/components/ScreenWrapper';
import { theme } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { hp, wp } from '@/helpers/common';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { Router, useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

const Profile = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter();

  const onSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error signing out', error.message);
    }
  };

  const handleLogout = async () => {
    // show confirm modal
    Alert.alert('Confirm', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('modal cancelled');
        },
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          onSignOut();
        },
        style: 'destructive',
      },
    ]);
  };

  interface UserHeaderProps {
    user: User;
    router: Router;
  }

  const UserHeader = ({ user, router }: UserHeaderProps) => {
    return (
      <View
        style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4) }}
      >
        <View>
          <Header
            title='Profile'
            mb={30}
          />
          <Pressable
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Icon
              name='logout'
              colo={theme.colors.rose}
            />
          </Pressable>
        </View>
        <View style={styles.container}>
          <View style={{ gap: 15 }}>
            <View style={styles.avatarContainer}>
              <Avatar
                uri={user?.image}
                size={hp(12)}
                rounded={theme.radius.xxl * 1.4}
              />
              <Pressable
                style={styles.editIcon}
                onPress={() => router.push('main/editProfile')}
              >
                <Icon
                  name='edit'
                  color={theme.colors.text}
                  strokeWidth={2.5}
                  size={20}
                />
              </Pressable>
            </View>
            {/* username and address */}
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Text style={styles.username}>{user && user.name}</Text>
              <Text style={styles.infoText}>{user && user.address}</Text>
            </View>
            {/* email, phone number, and bio */}
            <View style={{ gap: 10 }}>
              <View style={styles.info}>
                <Icon
                  name='mail'
                  size={20}
                  color={theme.colors.textLight}
                />
                <Text style={styles.infoText}>{user && user.email}</Text>
              </View>
              {user && user.phoneNumber && (
                <View style={styles.info}>
                  <Icon
                    name='call'
                    size={20}
                    color={theme.colors.textLight}
                  />
                  <Text style={styles.infoText}>{user.phoneNumber}</Text>
                </View>
              )}
              {user && user.bio && (
                <Text style={styles.infoText}>{user.bio}</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper bgColor='white'>
      <UserHeader
        user={user as User}
        router={router}
      />
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: wp(4),
    marginBottom: hp(20),
  },
  headerShape: {
    width: wp(100),
    height: hp(20),
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  username: {
    fontSize: hp(3),
    fontWeight: '500',
    color: theme.colors.textDark,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: '500',
    color: theme.colors.textLight,
  },
  logoutButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: '#fee2e2',
  },
  listStyle: {
    paddingHorizontal: wp(4),
    paddingBottom: 30,
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text,
  },
});
