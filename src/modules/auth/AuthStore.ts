import { makeAutoObservable, set } from 'mobx';

import { Nullable } from '../../base/types/BaseTypes';
import AuthService from './AuthService';
import { LoginForm, LoginFormFields } from './forms/LoginFrom';

export class AuthStore {
  authInitialLoader: boolean = true;
  authLoader: boolean = false;

  accessToken: Nullable<string> = null;

  loginForm = LoginForm;

  private authService: AuthService;

  constructor() {
    makeAutoObservable(this);
    this.authService = new AuthService();
  }

  authLogin = (smsCode: string) => {};

  logout = async () => {};

  setLoading = (value: boolean) => {
    this.authLoader = value;
  };

  changeLoginForm = (key: LoginFormFields, value: any) => {
    set(this.loginForm, key, value);
  };
}
