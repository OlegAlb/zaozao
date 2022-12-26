export interface IColors extends IBaseColors {
  transparent: string;
  white: string;
  shadow: string;
  darkShadow: string;
  black: string;
  red: string;
  transparentBlack: string;
  blue: string;
  lightBlue: string;
  grey: string;
  greyLight: string;
  greySuperLight: string;
  green: string;
  greenLight: string;
  greenSuperLight: string;
  greenDark: string;
  greenDarkLight: string;
}

interface IBaseColors {
  [key: string]: string;
}
