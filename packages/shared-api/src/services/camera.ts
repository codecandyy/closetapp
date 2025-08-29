import * as ImagePicker from 'expo-image-picker';

export async function pickFromLibrary() {
  try {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) throw new Error('MEDIA_PERMISSION_DENIED');
    
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      aspect: [1, 1]
    });
    
    if (res.canceled) return;
    return res.assets[0].uri;
  } catch (error) {
    throw new Error('IMAGE_PICKER_FAILED');
  }
}

export async function takePhoto() {
  try {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) throw new Error('CAMERA_PERMISSION_DENIED');
    
    const res = await ImagePicker.launchCameraAsync({ 
      allowsEditing: true, 
      quality: 0.8,
      aspect: [1, 1]
    });
    
    if (res.canceled) return;
    return res.assets[0].uri;
  } catch (error) {
    throw new Error('CAMERA_ACCESS_FAILED');
  }
}