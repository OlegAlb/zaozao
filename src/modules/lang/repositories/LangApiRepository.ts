import AbstractApiRepository from '../../../base/api/AbstractApiRepository';

import { LangType } from '../types/Lang';

export default class LangApiRepository extends AbstractApiRepository {
  setLanguage = (language: LangType) => {
    this.apiClient.setLanguage(language);
  };

  profileSetLanguage = (language: LangType) => {
    return this.apiClient.post({
      url: '/profile/setLanguage',
      data: {
        language,
      },
    });
  };
}
