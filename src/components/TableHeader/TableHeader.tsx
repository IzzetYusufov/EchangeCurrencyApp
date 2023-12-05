import classNames from 'classnames';
import './TableHeader.css';

const TABLE_HEADER = {
  currencies: [
    'Currencies',
    `Updated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
  ],
  buy: ['Buy'],
  sell: ['Sell']
};

export const TableHeader = () => {
  return (
    <tr>
      {Object.values(TABLE_HEADER).map((header, i) => {
        const [title, date = null] = header;

        return (
          <th
            className={classNames('th-header', {
              'price-cell--border': header.length === 1
            })}
            key={i}
          >
            {header.length > 1 ? (
              <div className="th-header__countries-title">
                <p>{title}</p>
                <p className="text-[8px] md:text-xs">{date}</p>
              </div>
            ) : (
              <div className="font-semibold text-left">
                <p>{title}</p>
              </div>
            )}
          </th>
        );
      })}
    </tr>
  );
};
