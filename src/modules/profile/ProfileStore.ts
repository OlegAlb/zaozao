import {makeAutoObservable, set} from 'mobx';

import {Nullable} from '../../base/types/BaseTypes';
import {User} from '../common/models/User';
import ProfileService from './ProfileService';
import {AuthProfileForm, AuthProfileFormFields} from './forms/AuthProfileForm';

export class ProfileStore {
  profile: Nullable<User> = null;
  loading: boolean = false;
  editLoading: boolean = false;

  authProfileForm = AuthProfileForm;

  private profileService: ProfileService;

  constructor() {
    makeAutoObservable(this);

    this.profileService = new ProfileService();
  }

  getProfile = async (id: string) => {
    this.setLoading(true);

    this.profileService
      .getProfile(id)
      .then(response => {
        this.setProfile(response);
      })
      .catch(error => {
        console.log('Get profile error', error);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  editProfile = async (fileds: User) => {
    this.setEditLoading(true);

    return this.profileService
      .editProfile(fileds)
      .then(response => {
        this.setProfile(response);
      })
      .catch(error => {
        console.log('Edit profile error', error);
      })
      .finally(() => {
        this.setEditLoading(false);
      });
  };

  submitAuthProfile = async () => {
    this.setEditLoading(true);

    const fields = {
      ...this.profile,
      displayName: this.authProfileForm.displayName,
      photoURL: this.authProfileForm.photoURL,
    } as User;

    this.profileService
      .editProfile(fields)
      .then(() => {
        this.setProfile(fields);
      })
      .catch(error => {
        console.log('Submit auth profile error', error);
      })
      .finally(() => {
        this.setEditLoading(false);
      });
  };

  muteContact = async (contactId: string) => {
    const mutedList = [...this.profile?.mutedList!, contactId];

    this.editProfile({...this.profile, mutedList} as User);
  };

  unmuteContact = async (contactId: string) => {
    const mutedList = this.profile?.mutedList.filter(
      mutedContactId => mutedContactId !== contactId,
    );

    this.editProfile({...this.profile, mutedList} as User);
  };

  banContact = async (contactId: string) => {
    const bannedList = [...this.profile?.bannedList!, contactId];

    this.editProfile({...this.profile, bannedList} as User);
  };

  unbanContact = async (contactId: string) => {
    const bannedList = this.profile?.bannedList.filter(
      bannedContactId => bannedContactId !== contactId,
    );

    this.editProfile({...this.profile, bannedList} as User);
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  setEditLoading = (editLoading: boolean) => {
    this.editLoading = editLoading;
  };

  setProfile = (profile: User) => {
    this.profile = profile;
  };

  changeAuthProfileForm = (key: AuthProfileFormFields, value: any) => {
    set(this.authProfileForm, key, value);
  };
}
