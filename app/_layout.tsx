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
    async (user: User) => {
      let result = await getUserData(user?.id);
      if (result.success) {
        setUserData(result.data);
      }
    },
    [setUserData]
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user', session?.user.id);

      if (session) {
        // set auth
        setAuth(session.user);
        // store user in async storage
        updateUserData(session?.user);
        // move to home screen
        router.replace('/main/home');
      } else {
        // set auth to null
        setAuth(null);
        // move to welcome screen
        router.replace('/welcome');
      }
    });
  }, [setAuth, updateUserData]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;
