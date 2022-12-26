export default class ArrayHelper {
  static chunkArray = (list: any[], chunk: number): any[][] => {
    const result = [];

    for (let i = 0; i < list.length; i += chunk) {
      result.push(list.slice(i, i + chunk));
    }

    return result;
  };

  static add = (array: any[], item: any) => {
    return [...array, item];
  };

  static remove = (array: any[], item: any) => {
    return array.filter(arrayItem => arrayItem !== item);
  };

  static removeBy = (array: any[], field: string, value: any) => {
    return array.filter(arrayItem => arrayItem[field] !== value);
  };

  static replace = (array: any[], item: any) => {
    return array.map(arrayItem =>
      arrayItem.id === item.id ? item : arrayItem,
    );
  };

  static first = (array: any[]) => {
    return array[0];
  };

  static last = (array: any[]) => {
    return array[array.length - 1];
  };

  static extract = (array: any[], field: string) => {
    return array.map(item => item[field]);
  };
}
