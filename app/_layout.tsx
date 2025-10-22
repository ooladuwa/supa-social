import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { getUserData } from '@/services/userService';
import { User } from '@supabase/supabase-js';
import { router, Stack } from 'expo-router';
import { useCallback, useEffect } from 'react';

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();

  const updateUserData = useCallback(
    async (user: User, email: string) => {
      let result = await getUserData(user?.id);
      if (result.success) {
        setUserData({ ...result.data, email });
      }
    },
    [setUserData]
  );

  useEffect(() => {
    // Check initial auth state first
    const checkAuthState = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setAuth(session.user);
        updateUserData(session.user, session.user.email || '');
        router.replace('/main/home');
      } else {
        setAuth(null);
        router.replace('/welcome');
      }
    };

    checkAuthState();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session.user);
        updateUserData(session.user, session.user.email || '');
        router.replace('/main/home');
      } else {
        setAuth(null);
        router.replace('/welcome');
      }
    });

    return () => subscription.unsubscribe();
  }, [setAuth, updateUserData]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;
