import 'flag-icons/css/flag-icons.min.css';
import './CountryAndFlag.css';

type Props = {
  currency: string;
  divider?: boolean;
  addClasses?: string;
};

export const CountryAndFlag: React.FC<Props> = ({ currency, divider, addClasses }) => {
  const modifiedCountry = currency.slice(0, 2).toLowerCase();

  return (
    <div className={`flag ${addClasses ? addClasses : ''}`}>
      <span className={`fi fi-${modifiedCountry}`} />

      <p className="md:text-base">{currency}</p>

      {divider && <p className="mr-2 self-center">|</p>}
    </div>
  );
};
