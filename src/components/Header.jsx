import { Link } from 'react-router-dom'
// import { useEffect, useState } from 'react';
import Logo from '../images/logo.svg'

function Header() {
  return (
    <header className="header">
    <Link className="header__logo" to="/">
      <img src={Logo} alt="Логотип в виде улыбающегося смайлика" />
    </Link>
    <ul className='header__list'>
      <li><Link className='header__link' to="/signup">Регистрация</Link></li>
      <li><Link className='header__link header__button' to="/signin">Войти</Link></li>
    </ul>
  </header>
  );
}

export default Header