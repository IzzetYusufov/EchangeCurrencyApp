export const roundExchange = (currency: string, value: string) => {
  const num = Math.floor((1 / +currency) * +value * 100) / 100;

  return num.toString();
};
