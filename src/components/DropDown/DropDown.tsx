import classNames from 'classnames';
import { useRef } from 'react';
import { useCurrenciesStore } from '../../store/CurrenciesStore';
import { CurrencyData } from '../../types/CurrencyData';
import { DropDownItem } from '../DropDownItem/DropDownItem';
import './DropDown.css';

type Props = {
  isOpen: boolean;
  setIsOpen: (_v: boolean) => void;
};

export const DropDown = ({ isOpen, setIsOpen }: Props) => {
  const currenciesData = useCurrenciesStore((state) => state.currenciesData);
  const setCurrentCurrency = useCurrenciesStore((state) => state.setCurrentCurrency);
  const { ccy: quoteCurrency } = useCurrenciesStore((state) => state.selectedCurrency as CurrencyData);
  const dropdown = useRef<HTMLDivElement | null>(null);

  const handleScrollToTOp = (refElement: HTMLDivElement | null) => {
    if (refElement && dropdown.current) {
      dropdown.current.scrollTop = 0;
    }
  };

  const handleSelect = (newCurrency: CurrencyData) => {
    setIsOpen(false);
    setCurrentCurrency(newCurrency);
  };

  return (
    <div
      ref={dropdown}
      className={classNames('dropdown', {
        'hide-item': !isOpen,
        'show-item': isOpen,
      })}
    >
      {currenciesData.map(
        (currency) =>
          currency.ccy !== quoteCurrency && (
            <DropDownItem
              key={currency.ccy}
              currency={currency}
              handleSelect={handleSelect}
              handleScrollToTOp={handleScrollToTOp}
            />
          ),
      )}
    </div>
  );
};
