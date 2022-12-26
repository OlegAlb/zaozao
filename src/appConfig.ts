import {
  getBuildNumber,
  getVersion,
  getUniqueId,
} from 'react-native-device-info';

export const appConfig = {
  deviceId: getUniqueId(),
  version: `${getVersion()} (${getBuildNumber()})`,
  databasePath: 'https://zaozao-d0677-default-rtdb.firebaseio.com/',
  filestoragePath:
    'https://firebasestorage.googleapis.com/v0/b/zaozao-d0677.appspot.com/o/',
};
