import { jsonProperty, Serializable } from 'ts-serializable';

import { Nullable } from '../../../base/types/BaseTypes';

export class User extends Serializable {
  @jsonProperty(String, null) id: Nullable<string> = null;
  @jsonProperty(String, null) displayName: Nullable<string> = null;
  @jsonProperty(String, null) phoneNumber: Nullable<string> = null;
  @jsonProperty(String, null) photoURL: Nullable<string> = null;
  @jsonProperty(Number, null) created: Nullable<number> = null;

  @jsonProperty(String, null) status: Nullable<string> = null;
  @jsonProperty(Number, null) statusUpdated: Nullable<number> = null;

  @jsonProperty(Boolean, null) isOnline: Nullable<boolean> = null;
  @jsonProperty(Number, null) lastOnline: Nullable<number> = null;

  @jsonProperty([String], null) mutedList: string[] = [];
  @jsonProperty([String], null) bannedList: string[] = [];
}
