import ScreenWrapper from '@/components/ScreenWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Alert, Button, StyleSheet, Text } from 'react-native';

const Home = () => {
  const { user, setAuth } = useAuth();
  console.log('user', user);

  const onSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error signing out', error.message);
    }
  };

  return (
    <ScreenWrapper>
      <Text>Home</Text>
      <Button
        title='Sign Out'
        onPress={onSignOut}
      />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
