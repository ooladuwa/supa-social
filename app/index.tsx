import Loading from '@/components/Loading';
import React from 'react';
import { View } from 'react-native';

const Index: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Loading />
    </View>
  );
};

export default Index;
