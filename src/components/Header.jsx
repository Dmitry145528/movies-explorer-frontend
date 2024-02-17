import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Logo from '../images/logo.svg'

function Header({ login }) {

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <header className="header">
        <Link className="header__logo" to="/">
          <img src={Logo} alt="Логотип в виде улыбающегося смайлика" />
        </Link>
        {login === true ? (
          <div className="header__container">
            <ul className='header__list header__list_auth'>
              <li><Link className='header__link header__link_auth' to="/movies">Фильмы</Link></li>
              <li><Link className='header__link header__link_auth' to="/saved-movies">Сохранённые фильмы</Link></li>
            </ul>
            <Link className={currentPath === '/' ? 'header__link_img' : 'header__link_img header__link_img_dark'} to="/profile"></Link>
          </div>
        ) : (
          <ul className='header__list'>
            <li><Link className='header__link' to="/signup">Регистрация</Link></li>
            <li><Link className='header__link header__button' to="/signin">Войти</Link></li>
          </ul>
        )}
      </header>
    </>
  );
}

export default Header