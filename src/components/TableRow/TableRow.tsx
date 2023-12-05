import { InputTitle } from '../../enum/InputTitle';
import { CurrencyData } from '../../types/CurrencyData';
import { CountryAndFlag } from '../CountryAndFlag/CountryAndFlag';
import { TableCell } from '../TableCell/TableCell';
import './TableRow.css';

type Props = {
  currency: CurrencyData;
};

export const TableRow = ({ currency }: Props) => {
  const { buy: buyPrice, sale: cellPrice, ccy: quoteCurrency, base_ccy: baseCurrency } = currency;

  return (
    <tr className="row" key={quoteCurrency}>
      <td className="row__cell">
        <CountryAndFlag currency={baseCurrency} divider={true} />

        <CountryAndFlag currency={quoteCurrency} />
      </td>

      <TableCell currency={currency} price={buyPrice} title={InputTitle.get} />

      <TableCell currency={currency} price={cellPrice} title={InputTitle.cell} />
    </tr>
  );
};
