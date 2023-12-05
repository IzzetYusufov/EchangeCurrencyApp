import classNames from 'classnames';
import { useState } from 'react';
import { CiEdit as PencilToEditIcon } from 'react-icons/ci';
import { InputTitle } from '../../enum/InputTitle';
import { useCurrenciesStore } from '../../store/CurrenciesStore';
import { CurrencyData } from '../../types/CurrencyData';
import { RowEditForm } from '../RowEditForm/RowEditForm';
import './TableCell.css';

type Props = {
  title: InputTitle;
  currency: CurrencyData;
  price: string;
};

export const TableCell = ({ currency, title, price }: Props) => {
  const currencyToEdit = useCurrenciesStore((state) => state.currencyToEdit);
  const setCurrencyToEdit = useCurrenciesStore((state) => state.setCurrencyToEdit);
  const [pencilOnMouseEnter, setPencilOnMouseEnter] = useState({
    price: '',
    value: '',
  });

  const handleOnCellClick = (curr: CurrencyData) => {
    setCurrencyToEdit(curr);
    setPencilOnMouseEnter({ price: '', value: title });
  };

  return (
    <td
      className="price-cell"
      onMouseEnter={() => !currencyToEdit && setPencilOnMouseEnter({ price: price, value: title })}
      onMouseLeave={() => !currencyToEdit && setPencilOnMouseEnter({ price: '', value: '' })}
    >
      {currencyToEdit?.ccy === currency.ccy && pencilOnMouseEnter.value === title ? (
        <RowEditForm currency={currency} title={title} />
      ) : (
        <p className="price-cell__text">{price}</p>
      )}

      <PencilToEditIcon
        onClick={() => handleOnCellClick(currency)}
        className={classNames('price-cell__pencil', {
          'hide-item': pencilOnMouseEnter.price !== price,
        })}
      />
    </td>
  );
};
