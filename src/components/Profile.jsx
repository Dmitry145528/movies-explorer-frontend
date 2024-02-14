import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useFormAndValidation } from "../hooks/useFormAndValidation"

function Profile() {

  const { values, handleChange, errors } = useFormAndValidation();
  const [isEditing, setIsEditing] = useState(false);
  console.log(isEditing);

  const handleEditClick = () => {
    setIsEditing(true);
    console.log(isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Отправка данных на сервер:", values);
  }

  return (
    <main className="auth profile">
      <h1 className="auth__header_title">{`Привет, ${values.name || "заглушка"}`}</h1>
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
              Почта
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
          <button type="button" onClick={handleSubmit} className="profile__button" aria-label={`Кнопка с надписью сохранить`}>
            {'Сохранить'}
          </button>
        ) : (
          <button type="button" className="profile__button" onClick={handleEditClick} aria-label={`Кнопка с надписью редактировать`}>
            {'Редактировать'}
          </button>
        )}
      </form>
      <Link className="auth__caption-link profile__caption-link" to='/signout'>{"Выйти из аккаунта"}</Link>
    </main >
  )
}

export default Profile