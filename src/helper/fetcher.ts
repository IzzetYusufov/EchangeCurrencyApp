import { CurrencyData } from '../types/CurrencyData';
import { roundTableCurrency } from './roundTableCurrency';

export const fetcher = async (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((response: { currency: CurrencyData[] }) => {
      const countFromStorage = localStorage.getItem('mounted');

      if (countFromStorage && +countFromStorage === 5) {
        localStorage.removeItem('mounted');
        throw new Error('500 Internal Server Error');
      }

      return response.currency.map((curr) => ({
        ...curr,
        buy: roundTableCurrency(curr.buy),
        sale: roundTableCurrency(curr.sale)
      }));
    });
