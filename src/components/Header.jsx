import logo from '../images/icons/Header-logo.svg';
import { Link } from 'react-router-dom';

function Header({ buttonValue, endpoint }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Место" />
            <Link to={endpoint}>
                <button className="header__button link">{buttonValue}</button>
            </Link>
        </header>
    );
}

export default Header;
