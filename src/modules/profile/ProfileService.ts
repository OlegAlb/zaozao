import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { modelFactory } from '../../base/ModelFactory';
import { User } from '../common/models/User';

export default class ProfilesService {
  constructor() {}

  getProfile = async (id: string) => {
    const usersCollection = firestore().collection('users');
    const snapshot = await usersCollection.doc(id).get();
    const data = await snapshot.data();

    return modelFactory.create<User>(User, data as any);
  };

  editProfile = async (fields: User) => {
    const usersCollection = firestore().collection('users');

    await usersCollection.doc(fields.id!).set(fields, { merge: true });
    await auth().currentUser?.updateProfile(fields);

    return this.getProfile(fields.id!);
  };
}
