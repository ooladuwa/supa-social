import Icon from '@/assets/icons';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import { theme } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { hp, wp } from '@/helpers/common';
import { getUserImageSrc, uploadFile } from '@/services/imageService';
import { updateUserData } from '@/services/userService';
import { CustomUser } from '@/types/user';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const EditProfile = () => {
  const { user: currentUser, setUserData } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState({
    name: '',
    phoneNumber: '',
    image: null as string | null | ImagePicker.ImagePickerAsset,
    bio: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  let imageSource =
    user.image && typeof user.image === 'object'
      ? user.image.uri
      : getUserImageSrc(user?.image as string);

  useEffect(() => {
    setUser({
      name: currentUser?.name || '',
      phoneNumber: currentUser?.phoneNumber || '',
      image: currentUser?.image || null,
      bio: currentUser?.bio || '',
      address: currentUser?.address || '',
    });
  }, [currentUser]);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setUser({ ...user, image: result.assets[0] });
    }
  };

  const onSubmit = async () => {
    let userData = { ...user };
    let { name, phoneNumber, bio, address, image } = userData;
    if (!name || !phoneNumber || !bio || !address || !image) {
      Alert.alert('Please fill in all fields');
      return;
    }
    setLoading(true);

    if (image && typeof image === 'object') {
      let imageRes = await uploadFile({
        folderName: 'profiles',
        fileUri: image.uri,
        isImage: true,
      });

      if (imageRes.success && imageRes.data) {
        userData.image = imageRes.data;
      } else {
        Alert.alert('Error', 'Failed to upload image');
        setLoading(false);
        return;
      }
    }

    // update user data
    let response = await updateUserData(currentUser?.id || '', userData);
    setLoading(false);
    if (response.success) {
      setUserData({
        ...currentUser,
        ...userData,
        id: currentUser?.id || '',
      } as CustomUser);
      router.back();
    }
  };

  return (
    <ScreenWrapper bgColor='white'>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Header title='Edit Profile' />

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image
                source={imageSource}
                style={styles.avatar}
              />
              <Pressable
                style={styles.cameraIcon}
                onPress={onPickImage}
              >
                <Icon
                  name='camera'
                  size={20}
                  strokeWidth={2.5}
                />
              </Pressable>
            </View>
            <Text style={{ fontSize: hp(1.5) }}>
              Please enter your profile information.
            </Text>
            <Input
              icon={<Icon name='user' />}
              placeholder='enter your name'
              value={user.name}
              onChangeText={(value) => setUser({ ...user, name: value })}
            />
            <Input
              icon={<Icon name='call' />}
              placeholder='enter your phone number'
              value={user.phoneNumber}
              onChangeText={(value) => setUser({ ...user, phoneNumber: value })}
            />
            <Input
              icon={<Icon name='location' />}
              placeholder='enter your address'
              value={user.address}
              onChangeText={(value) => setUser({ ...user, address: value })}
            />
            <Input
              placeholder='enter your bio'
              value={user.bio}
              multiline={true}
              containerStyle={styles.bio}
              onChangeText={(value) => setUser({ ...user, bio: value })}
            />

            <Button
              title='Update'
              onPress={onSubmit}
              loading={loading}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: wp(4) },
  avatarContainer: { height: hp(14), width: wp(28), alignSelf: 'center' },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: theme.radius.xxl * 1.8,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  form: { gap: 10, marginTop: 20 },
  input: {
    flexDirection: 'row',
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous',
    padding: 17,
    paddingHorizontal: 20,
    gap: 15,
  },
  bio: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: hp(15),
    paddingVertical: 15,
  },
});
