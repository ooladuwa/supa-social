import { supabase } from '@/lib/supabase';
import { SUPABASE_URL } from '@env';
import * as FileSystem from 'expo-file-system/legacy';

export const getUserImageSrc = (imagePath: any) => {
  if (imagePath) {
    return getSupabaseUrl(imagePath);
  } else {
    return require('../assets/images/defaultUser.png');
  }
};

export const getSupabaseUrl = (filePath: any) => {
  if (filePath) {
    return {
      uri: `${SUPABASE_URL}/storage/v1/object/public/uploads/${filePath}`,
    };
  }
  return null;
};
export interface UploadFileProps {
  folderName: string;
  fileUri: string;
  isImage: boolean;
}

export const uploadFile = async ({
  folderName,
  fileUri,
  isImage = true,
}: UploadFileProps) => {
  try {
    let fileName = getFilePath(folderName, isImage);

    // Read file as base64
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Use base64 string directly with Supabase
    let { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, base64, {
        cacheControl: '3600',
        upsert: false,
        contentType: isImage ? 'image/*' : 'video/*',
      });

    if (error) {
      console.log('error uploading file', error);
      return { success: false, msg: 'Could not upload media file' };
    }
    console.log('file uploaded successfully', data);
    return { success: true, data: data && data.path };
  } catch (error) {
    console.log('error uploading file', error);
    return { success: false, msg: 'Could not upload media file' };
  }
};

export const getFilePath = (folderName: string, isImage: boolean) => {
  return `/${folderName}/${new Date().getTime()}${isImage ? '.png' : '.mp4'}`;
};
