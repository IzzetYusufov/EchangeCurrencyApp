import { useCurrenciesStore } from '../../store/CurrenciesStore';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableRow } from '../TableRow/TableRow';
import './TheTable.css';

export const TheTable = () => {
  const currenciesData = useCurrenciesStore((state) => state.currenciesData);

  return (
    <div className="table-board">
      <table className="table-board__sizes">
        <thead className="table-board__header-text">
          <TableHeader />
        </thead>

        <tbody className="table-board__body-text">
          {currenciesData.map((currency) => (
            <TableRow currency={currency} key={currency.ccy} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
