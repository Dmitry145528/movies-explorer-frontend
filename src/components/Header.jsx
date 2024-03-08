import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import LoggedInStatusContext  from '../contexts/LoggedInStatusContext'
import Logo from '../images/logo.svg'
import {
  ENDPOINT_SIGNUP,
  ENDPOINT_SIGNIN,
  ENDPOINT_MOVIES,
  ENDPOINT_SAVED_MOVIES,
  ENDPOINT_PROFILE,
  ENDPOINT_MAIN
} from '../utils/constans';

function Header() {
  const loggedIn = useContext(LoggedInStatusContext);

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const handleBurgerClick = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <>
      <header className="header">
        <Link className="header__logo" to={ENDPOINT_MAIN}>
          <img src={Logo} alt="Логотип в виде улыбающегося смайлика" />
        </Link>
        {loggedIn === true ? (
          <>
            <nav className="header__container">
              <ul className='header__list header__list_auth'>
                <li><Link className={`header__link header__link_auth ${currentPath === ENDPOINT_MOVIES ? 'header__link_active' : ''}`} to={ENDPOINT_MOVIES}>Фильмы</Link></li>
                <li><Link className={`header__link header__link_auth ${currentPath === ENDPOINT_SAVED_MOVIES ? 'header__link_active' : ''}`} to={ENDPOINT_SAVED_MOVIES}>Сохранённые фильмы</Link></li>
              </ul>
              <Link className={currentPath === ENDPOINT_MAIN ? 'header__link_img' : 'header__link_img header__link_img_dark'} to={ENDPOINT_PROFILE}></Link>
            </nav>
            <nav className={isBurgerMenuOpen ? "header__container_mobile header__container_mobile-open" : "header__container_mobile"}>
              <ul className='header__list header__list_auth-mobile'>
                <li><Link className={`header__link header__link_auth ${currentPath === ENDPOINT_MAIN ? 'header__link_active' : ''}`} to={ENDPOINT_MAIN}>Главная</Link></li>
                <li><Link className={`header__link header__link_auth ${currentPath === ENDPOINT_MOVIES ? 'header__link_active' : ''}`} to={ENDPOINT_MOVIES}>Фильмы</Link></li>
                <li><Link className={`header__link header__link_auth ${currentPath === ENDPOINT_SAVED_MOVIES ? 'header__link_active' : ''}`} to={ENDPOINT_SAVED_MOVIES}>Сохранённые фильмы</Link></li>
              </ul>
              <Link className={currentPath === ENDPOINT_MAIN ? 'header__link_img' : 'header__link_img header__link_img_dark'} to={ENDPOINT_PROFILE}></Link>
            </nav>
            <button className={isBurgerMenuOpen ? "header__button_mobile-close rotateClockwise" : "header__button_mobile "} onClick={handleBurgerClick}></button>
          </>
        ) : (
          <ul className='header__list'>
            <li><Link className='header__link' to={ENDPOINT_SIGNUP}>Регистрация</Link></li>
            <li><Link className='header__link header__button' to={ENDPOINT_SIGNIN}>Войти</Link></li>
          </ul>
        )}
      </header>
    </>
  );
}

export default Header;