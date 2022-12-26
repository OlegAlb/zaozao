export default class FormValidationHelper {
  static isEmailValid = (email: string) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;

    return reg.test(email);
  };

  static isPhoneValid = (phone: string) => {
    const reg =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}\s[0-9]{2}$/;

    return reg.test(phone);
  };

  static isRequired = (field: string) => {
    return field.length !== 0;
  };

  static isNotEmpty = (value: any) => {
    return (
      value !== null &&
      value !== undefined &&
      typeof value === 'object' &&
      Object.keys(value).length !== 0
    );
  };

  static equal = (value1: any, value2: any) => {
    if (value1 === value2) return true;
    if (value1.length !== value2.length) return false;

    for (let i = 0; i < value1.length; i++) {
      if (value1[i] !== value2[i]) {
        return false;
      }
    }

    return true;
  };
}
