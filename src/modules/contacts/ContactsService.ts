import firestore from '@react-native-firebase/firestore';
import Contacts from 'react-native-contacts';

import {modelFactory} from '../../base/ModelFactory';
import ArrayHelper from '../../helpers/ArrayHelper';
import UserHelper from '../../helpers/UserHelper';
import {User} from '../common/models/User';

export default class ContactsService {
  constructor() {}

  getContacts = async () => {
    const usersCollection = firestore().collection('users');
    const clientContacts = await Contacts.getAll();
    const phoneChunks = ArrayHelper.chunkArray(
      UserHelper.getPhones(clientContacts),
      10,
    );

    const results = await Promise.all(
      phoneChunks.map(async chunk => {
        const data = await usersCollection
          .where('phoneNumber', 'in', chunk)
          .get();

        return data.docs.map(doc => ({id: doc.id, ...doc.data()}));
      }),
    );

    return modelFactory.createList<User>(User, results.flat());
  };

  deleteContact = async (phone: string) => {
    const clientContacts = await Contacts.getAll();
    console.log(UserHelper.getRecordId(clientContacts, phone));
  };
}
