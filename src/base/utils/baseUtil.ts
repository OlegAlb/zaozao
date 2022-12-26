export const isTrue = (value: any) => {
  return !!value === true;
};

export const isEmpty = (value: any) => {
  return (
    typeof value === 'undefined' ||
    value === null ||
    value.length === 0 ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};
