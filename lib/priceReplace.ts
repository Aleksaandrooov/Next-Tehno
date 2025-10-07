export const priceReplace = (price: number | string) => {
  return price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
};
