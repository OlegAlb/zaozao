import { makeAutoObservable } from 'mobx';
import { Asset } from 'react-native-image-picker';

import { Nullable } from '../../base/types/BaseTypes';
import FileService from './FileService';

export class FileStore {
  fileLoader: boolean = false;
  fileUri: Nullable<string> = null;

  private fileService: FileService;

  constructor() {
    makeAutoObservable(this);

    this.fileService = new FileService();
  }

  uploadFile = async (file: Asset, targetUri: string) => {
    this.setFileLoader(true);

    return this.fileService
      .uploadFile(file, targetUri)
      .then(downdloadURL => {
        this.setFile(downdloadURL);

        return downdloadURL;
      })
      .catch(error => {})
      .finally(() => {
        this.setFileLoader(false);
      });
  };

  setFile = (fileUri: Nullable<string>) => {
    this.fileUri = fileUri;
  };

  setFileLoader = (fileLoader: boolean) => {
    this.fileLoader = fileLoader;
  };
}
