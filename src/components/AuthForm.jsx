import { useLocation, Link } from "react-router-dom"
import { useFormAndValidation } from "../hooks/useFormAndValidation"
import { useState, useEffect } from "react"

function AuthForm({ title, onSubmit, buttonText, linkText, linkTo }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      onSubmit(values);
    } else {
      console.log('Форма невалидна, отправка данных отклонена.');
    }
  };

  // Сброс полей при монтировании компонента
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="auth">
      <div className="auth__header">
        <Link className="auth__header_logo header__logo" to="/">
          <img src='./src/images/logo.svg' alt="Логотип в виде улыбающегося смайлика" />
        </Link>
        <h1 className="auth__header_title">{title}</h1>
      </div>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__contact-info">
          {currentPath === "/signup" ? (
            <div className="auth__field">
              <label htmlFor="name" className="auth__label">
                Имя
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name || ''}
                onChange={handleChange}
                className={`auth__input ${errors.name ? 'auth__input_error' : ''}`}
                maxLength="30"
                minLength="2"
                required
              />
              <span className="auth__input-error">{errors.name}</span>
            </div>) : ('')
          }
          <div className="auth__field">
            <label htmlFor="email" className="auth__label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email || ''}
              onChange={handleChange}
              className={`auth__input ${errors.email ? 'auth__input_error' : ''}`}
              maxLength="35"
              required
            />
            <span className="auth__input-error">{errors.email}</span>
          </div>
          <div className="auth__field">
            <label htmlFor="password" className="auth__label">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password || ''}
              onChange={handleChange}
              className={`auth__input ${errors.password ? 'auth__input_error' : ''}`}
              minLength="8"
              required
            />
            <span className="auth__input-error">{errors.password}</span>
          </div>
        </fieldset>
        <button className={`auth__button ${currentPath === '/signin' ? 'auth__button_log' : 'auth__button_reg'} ${isValid ? '' : 'auth__button_disabled'}`} aria-label={`Кнопка с надписью ${buttonText}`} disabled={!isValid}>
          {buttonText}
        </button>
      </form>
      {linkText && (
        <p className="auth__caption">
          {linkText} <Link className="auth__caption-link" to={linkTo}>{currentPath === "/signup" ? ('Войти') : ('Регистрация')
          }</Link>
        </p>
      )}
    </main>
  );
}

export default AuthForm;