import FormValidationHelper from '../../../helpers/FormValidationHelper';

export const LoginForm = {
  phone: '',
  countryName: '',
  countryCode: '',
  phoneCode: '',

  isFormValid: function () {
    return (
      FormValidationHelper.isPhoneValid(this.phone) &&
      FormValidationHelper.isRequired(this.phone) &&
      FormValidationHelper.isRequired(this.countryName) &&
      FormValidationHelper.isRequired(this.countryCode) &&
      FormValidationHelper.isRequired(this.phoneCode)
    );
  },
};

export interface LoginForm {
  phone: string;
  countryName: string;
  countryCode: string;
  phoneCode: string;

  isFormValid: () => boolean;
}

export enum LoginFormFields {
  phone = 'phone',
  countryName = 'countryName',
  countryCode = 'countryCode',
  phoneCode = 'phoneCode',
}
