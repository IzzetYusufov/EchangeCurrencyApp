import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { IoCheckmarkDoneCircle as DoneButton } from 'react-icons/io5';
import { MdCancel as CancelButton } from 'react-icons/md';
import useSWR from 'swr';
import { InputTitle } from '../../enum/InputTitle';
import { fetcher } from '../../helper/fetcher';
import { roundTableCurrency } from '../../helper/roundTableCurrency';
import { useCurrenciesStore } from '../../store/CurrenciesStore';
import { CurrencyData } from '../../types/CurrencyData';
import './RowEditForm.css';

type Props = {
  currency: CurrencyData;
  title: InputTitle;
};

export const RowEditForm = ({ currency, title }: Props) => {
  const { data: initialCurrencies } = useSWR('/EchangeCurrencyApp/db.json', fetcher);
  const updateCurrencies = useCurrenciesStore((state) => state.updateCurrencies);
  const currencyToEdit = useCurrenciesStore((state) => state.currencyToEdit);
  const setCurrencyToEdit = useCurrenciesStore((state) => state.setCurrencyToEdit);

  const [inputValue, setInputValue] = useState(title === InputTitle.get ? currency.buy : currency.sale);
  const [isDone, setIsDone] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { buy: buyPrice, sale: cellPrice } = initialCurrencies?.find(
    (curr) => curr.ccy === currency.ccy,
  ) as CurrencyData;
  const minusTenPercent = roundTableCurrency(Number(buyPrice) - Number(buyPrice) * 0.1);
  const plusTenPercent = roundTableCurrency(Number(buyPrice) + Number(buyPrice) * 0.1);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currency]);

  useEffect(() => {
    +minusTenPercent === +inputValue ||
    +plusTenPercent === +inputValue ||
    +buyPrice === +inputValue ||
    +cellPrice === +inputValue
      ? setIsDone(true)
      : setIsDone(false);
  }, [buyPrice, cellPrice, inputValue, minusTenPercent, plusTenPercent]);

  const handleChanges = (reset: boolean) => {
    if (reset) {
      setCurrencyToEdit(null);
      setInputValue('');

      return;
    }

    switch (title) {
      case InputTitle.get:
        updateCurrencies({
          ...(currencyToEdit as CurrencyData),
          buy: inputValue,
        });
        break;
      case InputTitle.cell:
        updateCurrencies({
          ...(currencyToEdit as CurrencyData),
          sale: inputValue,
        });
        break;
      default:
        break;
    }

    setCurrencyToEdit(null);
    setInputValue('');
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        className="edit-row__input"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <DoneButton
        onClick={() => isDone && handleChanges(false)}
        className={classNames('edit-row__done-btn', {
          'hide-item': currency?.buy !== currencyToEdit?.buy,
          'edit-row__done-btn--disabled': !isDone,
          'edit-row__done-btn--active': isDone,
        })}
      />

      <CancelButton
        onClick={() => handleChanges(true)}
        className={classNames('edit-row__cancel-btn', {
          'hide-item': currency?.buy !== currencyToEdit?.buy,
        })}
      />
    </>
  );
};
