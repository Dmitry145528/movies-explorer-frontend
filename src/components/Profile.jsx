import { useState } from 'react';
import { useFormAndValidation } from "../hooks/useFormAndValidation"

function Profile(props) {

  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
  }

  return (
    <main className="auth profile">
      <h1 className="auth__header_title">{`Привет, ${values.name || "MARVO"}`}</h1>
      <form className="auth__form">
        <fieldset className="auth__contact-info profile__contact-info">
          <div className="auth__field profile__field">
            <label htmlFor="name" className="auth__label profile__label">
              Имя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name || "заглушка"} // временно пока нет запросов за данными после перезагрузки
              onChange={handleChange}
              className={`auth__input profile__input ${errors.name ? 'auth__input_error' : ''}`}
              maxLength="30"
              minLength="2"
              required
              disabled={!isEditing} // Делаем поле неактивным при просмотре
            />
          </div>
          <span className="profile__contact-info_line"></span>
          <div className="auth__field profile__field">
            <label htmlFor="email" className="auth__label profile__label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email || "zaglushka@mail"} // временно пока нет запросов за данными после перезагрузки
              onChange={handleChange}
              className={`auth__input profile__input ${errors.email ? 'auth__input_error' : ''}`}
              maxLength="35"
              required
              disabled={!isEditing} // Делаем поле неактивным при просмотре
            />
          </div>
        </fieldset>
        {isEditing ? (
          <>
          <p className="auth__enter-error">Тут будут располагаться сетевые ошибки</p>
          <button type="button" className={`auth__button ${isValid ? '' : 'auth__button_disabled'}`} aria-label={`Кнопка с надписью Сохранить`} onClick={handleSubmit} disabled={!isValid}>{'Сохранить'}</button>
          </>
        ) : (
          <button type="button" className="profile__button" onClick={handleEditClick} aria-label={`Кнопка с надписью редактировать`}>
            {'Редактировать'}
          </button>
        )}
      </form>
      {!isEditing ? (<button className="auth__caption-link profile__caption-link" onClick={props.onSignOut}>{"Выйти из аккаунта"}</button>) : ('')}
    </main >
  )
}

export default Profile