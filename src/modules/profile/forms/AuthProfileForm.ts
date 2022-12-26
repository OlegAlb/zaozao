import FormValidationHelper from '../../../helpers/FormValidationHelper';

export const AuthProfileForm: AuthProfileForm = {
  displayName: '',
  photoURL: '',

  isFormValid: function () {
    return FormValidationHelper.isRequired(this.displayName) && FormValidationHelper.isRequired(this.photoURL);
  },
};

export interface AuthProfileForm {
  displayName: string;
  photoURL: string;

  isFormValid: () => boolean;
}

export enum AuthProfileFormFields {
  displayName = 'displayName',
  photoURL = 'photoURL',
}
