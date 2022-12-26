import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { jsonProperty, Serializable } from 'ts-serializable';

import { Nullable } from '../../../base/types/BaseTypes';

export class Message extends Serializable {
  @jsonProperty(String, null) id: Nullable<string> = null;
  @jsonProperty(String, null) chatId: Nullable<string> = null;
  @jsonProperty(String, null) content: Nullable<string> = null;
  @jsonProperty(String, null) sender: Nullable<string> = null;
  @jsonProperty([String], null) readedBy: string[] = [];
  @jsonProperty(Object, null) sentAt: Nullable<FirebaseFirestoreTypes.Timestamp> = null;
}
