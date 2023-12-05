import { useRef } from 'react';
import { CurrencyData } from '../../types/CurrencyData';
import { CountryAndFlag } from '../CountryAndFlag/CountryAndFlag';
import './DropDownItem.css';

type Props = {
  currency: CurrencyData;
  handleSelect: (_v: CurrencyData) => void;
  handleScrollToTOp: (_v: HTMLDivElement | null) => void;
};

export const DropDownItem = ({ currency, handleSelect, handleScrollToTOp }: Props) => {
  const { ccy: quoteCurrency } = currency;
  const scrollToTopDropDown = useRef<HTMLDivElement | null>(null);

  const handleOnClickToSave = () => {
    handleScrollToTOp(scrollToTopDropDown.current);
    handleSelect(currency);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="dropdown__item"
      key={quoteCurrency}
      onKeyUp={(e) => e.key === 'Enter' && handleOnClickToSave()}
      onClick={handleOnClickToSave}
      ref={scrollToTopDropDown}
    >
      <h3 className="dropdown__text">{quoteCurrency}</h3>

      <CountryAndFlag currency={quoteCurrency} addClasses="dropdown--flag" />
    </div>
  );
};
