import { useRef } from 'react';
import { CurrencyData } from '../../types/CurrencyData';
import { CountryAndFlag } from '../CountryAndFlag/CountryAndFlag';
import './DropDownItem.css';

type Props = {
  currency: CurrencyData;
  handleSelect: (v: CurrencyData) => void;
  handleScrollToTOp: (v: HTMLDivElement | null) => void;
};

export const DropDownItem: React.FC<Props> = ({ currency, handleSelect, handleScrollToTOp }) => {
  const { ccy: quoteCurrency } = currency;
  const scrollToTopDropDown = useRef<HTMLDivElement | null>(null);

  const handleOnClickToSave = () => {
    handleScrollToTOp(scrollToTopDropDown.current);
    handleSelect(currency);
  };

  return (
    <div
      role="button"
      className="dropdown__item"
      key={quoteCurrency}
      onClick={handleOnClickToSave}
      ref={scrollToTopDropDown}
    >
      <h3 className="dropdown__text">{quoteCurrency}</h3>

      <CountryAndFlag currency={quoteCurrency} addClasses="dropdown--flag" />
    </div>
  );
};
