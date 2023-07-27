import logo from '../images/icons/Header-logo.svg';

function Header({ buttonValue }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Место" />
            <button className="header__button link">{buttonValue}</button>
        </header>
    );
}

export default Header;
