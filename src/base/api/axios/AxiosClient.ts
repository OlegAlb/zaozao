import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';

import { appConfig } from '../../../appConfig';
import Notification from '../../ui/Notification';
import IApiClient from '../IApiClient';
import { IAxiosConfig, IAxiosResponse } from './IAxiosInterfaces';

export default class AxiosClient implements IApiClient {
  readonly SUCCESS_STATUSES = [200, 201];
  readonly SERVER_ERROR = 500;
  readonly VERSION_NOT_VALID = 426;

  api: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.api = axios.create(config);
    this.api.defaults.baseURL = appConfig.apiUrl;

    this.setInterceptorRequest();
    this.setInterceptorResponse();
  }

  setAccessToken = (token: string) => {
    this.api.defaults.headers['Authorization'] = `Bearer ${token}`;
  };

  clearAccessToken = () => {
    this.api.defaults.headers['Authorization'] = null;
  };

  get = <T extends {}>(config: IAxiosConfig) => {
    return this.api.get<IAxiosResponse<T>>(config.url, config.config);
  };

  post = <T extends {}>(config: IAxiosConfig) => {
    return this.api.post<IAxiosResponse<T>>(config.url, config.data, config.config);
  };

  put = <T extends {}>(config: IAxiosConfig) => {
    return this.api.put<IAxiosResponse<T>>(config.url, config.data, config.config);
  };

  delete = <T extends {}>(config: IAxiosConfig) => {
    return this.api.delete<IAxiosResponse<T>>(config.url, config.config);
  };

  protected getApiErrors = (error: any) => {
    if (error?.message) {
      if (!Array.isArray(error?.errors) && error?.errors) {
        const errorsArray = Object.values(error?.errors);
        const errors = Array.prototype.concat.apply([], errorsArray);

        Notification.showError(errors.join('\n') || 'Unknown error');
      } else {
        Notification.showError(error?.message || 'Unknown error');
      }
    }
  };

  private setInterceptorRequest = () => {
    this.api.interceptors.request.use(
      async config => {
        const newConfig: AxiosRequestConfig = {
          ...config,
          headers: {
            'Content-Type': 'application/json',
            'App-Platform': Platform.OS,
            'App-DeviceId': appConfig.deviceId,
            'App-Version': appConfig.version,
            ...config.headers,
          },
        };
        return newConfig;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  };

  private setInterceptorResponse = () => {
    this.api.interceptors.response.use(
      response => {
        Log.res(response);

        if (!this.SUCCESS_STATUSES.includes(response.status)) {
          Notification.showError(response.data?.message || 'Unknown error');

          return Promise.reject(response);
        }

        if (response?.data?.message) {
          Notification.showSuccess(response?.data?.message);
        }

        return response;
      },
      error => {
        // global showing error messages
        Log.e('response error', error?.response);

        this.getApiErrors(error?.response?.data);

        if (error?.response?.status === this.VERSION_NOT_VALID) {
          Notification.showError('Application version error');
        }

        if (error.response?.status === this.SERVER_ERROR) {
          Notification.showError('Server error');
        }

        return Promise.reject(error);
      },
    );
  };
}
