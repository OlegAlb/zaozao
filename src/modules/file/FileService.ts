import storage from '@react-native-firebase/storage';
import { Asset } from 'react-native-image-picker';

export default class FileService {
  constructor() {}

  uploadFile = async (file: Asset, targetUri: string) => {
    const imageRef = storage().ref(targetUri);
    await imageRef.putFile(file.uri!);

    return await imageRef.getDownloadURL();
  };
}
