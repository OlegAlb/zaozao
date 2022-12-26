import {makeAutoObservable} from 'mobx';
import {PermissionsAndroid} from 'react-native';

import {Nullable} from '../../base/types/BaseTypes';
import {User} from '../common/models/User';
import ContactsService from './ContactsService';

export class ContactsStore {
  contacts: User[] = [];
  loading: boolean = false;
  permissionGranted: boolean = false;
  errors: string[] = [];

  currentContact: Nullable<User> = null;
  currentLoading: boolean = false;

  private contactsService: ContactsService;

  constructor() {
    makeAutoObservable(this);

    this.contactsService = new ContactsService();
  }

  getContacts = async () => {
    const getContacts = () => {
      this.setLoading(true);

      this.contactsService
        .getContacts()
        .then(response => {
          this.setContacts(response);
        })
        .catch(error => {
          console.log('Get events error', error);
        })
        .finally(() => {
          this.setLoading(false);
        });
    };

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then(
      granted => {
        this.setPermission(granted);

        if (granted) {
          getContacts();
        }
      },
    );
  };

  getCurrentContact = async (id: string) => {
    this.setCurrentLoading(true);

    const currentContact = this.contacts.find(contact => contact.id === id);

    if (currentContact) {
      this.setCurrentContact(currentContact);
    } else {
      this.setCurrentContact(null);
    }

    this.setCurrentLoading(false);
  };

  deleteContact = async (phone: string) => {
    this.contactsService.deleteContact(phone);
  };

  requestPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );

    this.setPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  setContacts = (contacts: User[]) => {
    this.contacts = contacts;
  };

  setPermission = (permissionGranted: boolean) => {
    this.permissionGranted = permissionGranted;
  };

  setErrors = (errors: string[]) => {
    this.errors = errors;
  };

  setCurrentLoading = (currentLoading: boolean) => {
    this.currentLoading = currentLoading;
  };

  setCurrentContact = (currentContact: Nullable<User>) => {
    this.currentContact = currentContact;
  };

  resetCurrentContact = () => {
    this.setCurrentContact(null);
  };
}
