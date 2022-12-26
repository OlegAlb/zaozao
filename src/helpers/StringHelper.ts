export default class StringHelper {
  static getNoun = (number: number, nounForm: string[]) => {
    number = Math.abs(number);

    if (number % 100 >= 5 && number % 100 <= 20) {
      return `${number} ${nounForm[2]}`;
    }

    if (number % 10 === 1) {
      return `${number} ${nounForm[0]}`;
    }

    if (number >= 2 && number <= 4) {
      return `${number} ${nounForm[1]}`;
    }

    return `${number} ${nounForm[2]}`;
  };
}
