import { useState } from 'react';
import { AiOutlineCaretDown as ArrowDown, AiOutlineCaretUp as ArrowUp } from 'react-icons/ai';
import { InputTitle } from '../../enum/InputTitle';
import { useCurrenciesStore } from '../../store/CurrenciesStore';
import { CurrencyData } from '../../types/CurrencyData';
import { CountryAndFlag } from '../CountryAndFlag/CountryAndFlag';
import { DropDown } from '../DropDown/DropDown';
import './CurrencyInputBar.css';

type Props = {
  inputTitle: InputTitle;
  nameOfCurrency: string;
  handleInputChange: (_e: React.ChangeEvent<HTMLInputElement> | string, _inputTitle: InputTitle) => void;
  inputValue: string;
  isReversed: boolean;
};

export const CurrencyInputBar = ({ inputTitle, handleInputChange, nameOfCurrency, inputValue, isReversed }: Props) => {
  const {
    base_ccy: baseCurrency,
    buy: buyPrice,
    sale: sellPrice,
  } = useCurrenciesStore((state) => state.selectedCurrency as CurrencyData);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    switch (true) {
      case !value && inputTitle === InputTitle.cell && !isReversed:
        handleInputChange(buyPrice, inputTitle);
        return;
      case !value && inputTitle === InputTitle.get && !isReversed:
        handleInputChange('1', inputTitle);
        return;
      case !value && inputTitle === InputTitle.cell && isReversed:
        handleInputChange('1', inputTitle);
        return;
      case !value && inputTitle === InputTitle.get && isReversed:
        handleInputChange(sellPrice, inputTitle);
        return;
      default:
        handleInputChange(inputValue, inputTitle);
        return;
    }
  };

  return (
    <div className="currency-bar">
      <div className="currency-bar__container" onBlur={() => setIsOpen((prev) => prev && !prev)}>
        <h3 className="currency-bar__title">{inputTitle}</h3>

        <input
          type="text"
          className="currency-bar__text"
          value={inputValue}
          onChange={(e) => handleInputChange(e, inputTitle)}
          onFocus={() => setIsOpen(false)}
          onBlur={handleInputOnBlur}
        />

        <button
          className="currency-bar__btn"
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={nameOfCurrency === baseCurrency}
        >
          <CountryAndFlag currency={nameOfCurrency} addClasses={nameOfCurrency === baseCurrency ? 'mr-2' : ''} />

          {nameOfCurrency !== baseCurrency && !isOpen && <ArrowUp className="currency-bar__arrow" />}

          {nameOfCurrency !== baseCurrency && isOpen && <ArrowDown className="currency-bar__arrow" />}
        </button>
      </div>

      {nameOfCurrency !== baseCurrency && <DropDown isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};
