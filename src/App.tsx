import { useEffect, useState } from 'react';
import { TbArrowsExchange as ReverseArrowIcon } from 'react-icons/tb';
import useSWR from 'swr';
import './App.css';
import { CurrencyInputBar } from './components/CurrencyInputBar/CurrencyInputBar';
import { Loading } from './components/Loading/Loading';
import { OnlyDigitAlert } from './components/OnlyDigitAlert/OnlyDigitAlert';
import { TheFooter } from './components/TheFooter/TheFooter';
import { TheNav } from './components/TheNav/TheNav';
import { TheTable } from './components/TheTable/TheTable';
import { InputTitle } from './enum/InputTitle';
import { fetcher } from './helper/fetcher';
import { roundExchange } from './helper/roundExchange';
import { roundTableCurrency } from './helper/roundTableCurrency';
import { useCurrenciesStore } from './store/CurrenciesStore';
import { CurrencyData } from './types/CurrencyData';
import { IsNanError } from './types/IsNanError';

function App() {
  const { isLoading, error } = useSWR('/EchangeCurrencyApp/db.json', fetcher, {
    onSuccess(data) {
      setCurrencies(data);
      setCurrentCurrency(data[0]);
      setBaseInputValue(data[0].buy);

      const countFromStorage = +(localStorage.getItem('mounted') || 0) + 1;
      localStorage.setItem('mounted', countFromStorage.toString());
      console.log('mounted');
    },
  });
  const setCurrencies = useCurrenciesStore((state) => state.setCurrencies);
  const setCurrentCurrency = useCurrenciesStore((state) => state.setCurrentCurrency);
  const currenciesData = useCurrenciesStore((state) => state.currenciesData);
  const selectedCurrency = useCurrenciesStore((state) => state.selectedCurrency as CurrencyData);

  const [baseInputValue, setBaseInputValue] = useState('');
  const [quoteInputValue, setQuoteInputValue] = useState('1');

  const [isReversed, setIsReversed] = useState(false);
  const [isNanError, setIsNanError] = useState<IsNanError>({
    status: false,
    inputTitle: InputTitle.get,
  });

  const handleReverseCurrency = () => {
    setBaseInputValue(quoteInputValue);
    setQuoteInputValue(baseInputValue);
    setIsReversed((prev) => !prev);
  };

  useEffect(() => {
    if (selectedCurrency) {
      isReversed ? handleInputChange('1', InputTitle.cell) : handleInputChange('1', InputTitle.get);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | string, title: InputTitle) => {
    const { sale: sellPrice, buy: buyPrice } = selectedCurrency as CurrencyData;
    const value = typeof e === 'string' ? e : e.target.value;
    const regex = /[^0-9.]/;

    if (regex.test(value)) {
      setIsNanError((prev) => ({ ...prev, status: true, inputTitle: title }));

      setTimeout(() => {
        setIsNanError((prev) => ({
          ...prev,
          status: false,
          inputTitle: title,
        }));
      }, 1500);
      return;
    }

    switch (true) {
      case InputTitle.cell === title && isReversed:
        setBaseInputValue(value);
        setQuoteInputValue(roundTableCurrency(+value * +sellPrice));
        return;
      case InputTitle.get === title && isReversed:
        setQuoteInputValue(value);
        setBaseInputValue(roundExchange(sellPrice, value));
        return;
      case InputTitle.cell === title && !isReversed:
        setBaseInputValue(value);
        setQuoteInputValue(roundExchange(buyPrice, value));
        return;
      case InputTitle.get === title && !isReversed:
        setQuoteInputValue(value);
        setBaseInputValue(roundTableCurrency(+value * +buyPrice));
        return;
      default:
        return null;
    }
  };

  return (
    <>
      <TheNav />

      <main className="main">
        <div className="main__container">
          {error && (
            <div className="h-full flex flex-col justify-center content-center gap-5 ">
              <h1 className="text-xl text-main text-center">
                Oops! Something went wrong!!! <br /> Please try to reload the page.
              </h1>
              <a
                href="/"
                className="bg-slate-300 text-center p-2 rounded-md text-[#413C69] transition-colors ease-linear duration-300 hover:bg-slate-100 focus:text-slate-100"
              >
                Reload
              </a>
            </div>
          )}

          {isLoading && <Loading />}

          {!error && !isLoading && currenciesData.length && (
            <>
              <TheTable />

              <div className="main__currencies-bar">
                <CurrencyInputBar
                  inputTitle={InputTitle.cell}
                  nameOfCurrency={!isReversed ? selectedCurrency.base_ccy : selectedCurrency.ccy}
                  handleInputChange={handleInputChange}
                  inputValue={baseInputValue}
                  isReversed={isReversed}
                />

                <ReverseArrowIcon className="main__revers-icon" onClick={handleReverseCurrency} />

                <CurrencyInputBar
                  inputTitle={InputTitle.get}
                  handleInputChange={handleInputChange}
                  nameOfCurrency={isReversed ? selectedCurrency.base_ccy : selectedCurrency.ccy}
                  inputValue={quoteInputValue}
                  isReversed={isReversed}
                />

                <OnlyDigitAlert isNanError={isNanError} setIsNanError={setIsNanError} />
              </div>
            </>
          )}
        </div>
      </main>

      <TheFooter />
    </>
  );
}

export default App;
