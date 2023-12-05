export const roundTableCurrency = (num: string | number): string =>
  typeof num === 'string' ? Number(num).toFixed(2) : num.toFixed(2);
