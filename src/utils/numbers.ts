export const humanizeNumbers = (num: number) => {
  const intl = new Intl.NumberFormat("de-DE");
  return intl.format(num);
};
