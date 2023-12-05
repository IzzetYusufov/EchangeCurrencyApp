import classNames from 'classnames';
import { IoCloseSharp as CloseBtn } from 'react-icons/io5';
import { InputTitle } from '../../enum/InputTitle';
import { IsNanError } from '../../types/IsNanError';
import './OnlyDigitAlert.css';

type Props = {
  isNanError: { status: boolean; inputTitle: InputTitle };
  setIsNanError: React.Dispatch<React.SetStateAction<IsNanError>>;
};

export const OnlyDigitAlert: React.FC<Props> = ({ isNanError, setIsNanError }) => {
  return (
    <div
      role="alert"
      className={classNames('alert', {
        'hide-item': !isNanError.status,
        'show-item': isNanError.status,
        'right-0': isNanError.inputTitle === InputTitle.get
      })}
    >
      <strong className="alert__title">Oops!</strong> <br />
      <span className="alert__text">Only digits is allowed</span>
      <button
        className="alert__close-btn"
        onClick={() => setIsNanError((prev) => ({ ...prev, status: false }))}
      >
        <CloseBtn role="button" className="alert__close-btn--color" />
      </button>
    </div>
  );
};
