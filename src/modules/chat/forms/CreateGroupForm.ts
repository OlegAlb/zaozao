import FormValidationHelper from '../../../helpers/FormValidationHelper';
import {User} from '../../common/models/User';

export const CreateGroupForm: CreateGroupForm = {
  name: '',
  membersIds: [],
  membersData: [],

  isFormValid: function () {
    return (
      FormValidationHelper.isRequired(this.name) &&
      FormValidationHelper.equal(
        this.membersData.map(member => member.id),
        this.membersIds,
      )
    );
  },
};

export interface CreateGroupForm {
  name: string;
  membersIds: string[];
  membersData: User[];

  isFormValid: () => boolean;
}

export enum CreateGroupFormFields {
  name = 'name',
  membersIds = 'membersIds',
  membersData = 'membersData',
}
