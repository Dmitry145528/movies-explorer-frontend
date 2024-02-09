// import { Link, useLocation } from 'react-router-dom'
// import { useEffect, useState } from 'react';
import Logo from '../images/logo.svg'

function Header() {
  return (
    <>
      <header className="header">
        <a className="header__logo" href='/'>
          <img src={Logo} alt="Логотип в виде улыбающегося смайлика" />
        </a>
        <ul className='header__list'>
          <li><a className='header__link' href='/'>Регистрация</a></li>
          <li><a className='header__link header__button' href='/'>Войти</a></li>
        </ul>
      </header>
    </>);
}

export default Header