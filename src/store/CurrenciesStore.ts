import { create } from 'zustand';
import { CurrencyData } from '../types/CurrencyData';

interface Store {
  currenciesData: CurrencyData[] | [];
  selectedCurrency: CurrencyData | null;
  setCurrencies: (_data: CurrencyData[]) => void;
  setCurrentCurrency: (_currency: CurrencyData) => void;
  updateCurrencies: (_v: CurrencyData) => void;
  currencyToEdit: CurrencyData | null;
  setCurrencyToEdit: (_v: CurrencyData | null) => void;
}

export const useCurrenciesStore = create<Store>((set) => ({
  currenciesData: [],
  selectedCurrency: null,
  currencyToEdit: null,
  setCurrencies: (data) => set({ currenciesData: data }),
  setCurrentCurrency: (currency) => set({ selectedCurrency: currency }),
  setCurrencyToEdit: (currency) => set({ currencyToEdit: currency }),
  updateCurrencies: (updCurrency) => {
    set((prev) => ({
      currenciesData: prev.currenciesData.map((currency) =>
        currency.ccy !== updCurrency.ccy ? currency : updCurrency,
      ),

      selectedCurrency: prev.selectedCurrency?.ccy === updCurrency.ccy ? updCurrency : prev.selectedCurrency,
    }));
  },
}));
