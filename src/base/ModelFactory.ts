import { Serializable } from 'ts-serializable';

export class ModelFactory {
  create<T extends Serializable>(Model: new () => T, data: Object): T {
    return new Model().fromJSON(data);
  }

  createList<T extends Serializable>(Model: new () => T, data: Object[]): T[] {
    return data.map((json: Object) => new Model().fromJSON(json));
  }
}

export const modelFactory = new ModelFactory();
