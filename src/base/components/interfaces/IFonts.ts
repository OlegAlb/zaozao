export interface IFonts extends IBaseFonts {
  bold: string;
  regular: string;
  semiBold: string;
}

interface IBaseFonts {
  [key: string]: string;
}
