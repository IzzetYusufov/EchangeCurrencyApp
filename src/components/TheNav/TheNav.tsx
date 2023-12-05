import logo from '../../assets/exchange-logo.png';
import './TheNav.css';

export const TheNav = () => {
  return (
    <header>
      <nav className="nav">
        <a href="/" className="nav__logo">
          <img src={logo} alt="exchange currency logo" className="nav__img" />
          <h1 className="nav__text">Fast Exchange Currency</h1>
        </a>
      </nav>
    </header>
  );
};
