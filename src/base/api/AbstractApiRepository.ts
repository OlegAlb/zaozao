import IApiClient from './IApiClient';
import AxiosClient from './axios/AxiosClient';
import { ApiClientTypes } from './ApiClientTypes';

export default abstract class AbstractApiRepository<T extends IApiClient = AxiosClient> {
  apiClient!: T;

  private static clients: { [key: number]: IApiClient } = {
    [ApiClientTypes.axios]: new AxiosClient(),
  };

  constructor(apiClientType = ApiClientTypes.axios) {
    //@ts-ignore
    this.setApiClient(AbstractApiRepository.clients[apiClientType]);
  }

  setApiClient = (apiClient: T) => {
    this.apiClient = apiClient;
  };
}
