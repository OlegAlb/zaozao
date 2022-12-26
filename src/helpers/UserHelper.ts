import { isPossibleNumber } from 'libphonenumber-js';
import { Contact } from 'react-native-contacts';

export default class UserHelper {
  static getPhones = (contacts: Contact[]) => {
    return contacts
      .map(contact => [
        ...new Set(
          contact.phoneNumbers
            .map(phoneNumber => phoneNumber.number.replace(/[ -]/g, ''))
            .filter(phoneNumber => isPossibleNumber(phoneNumber)),
        ),
      ])
      .flat();
  };

  static getRecordId = (contacts: Contact[], phone: string) => {
    return contacts.find(contact =>
      contact.phoneNumbers.map(phoneNumber => phoneNumber.number.replace(/[ -]/g, '')).includes(phone),
    )?.recordID;
  };
}
