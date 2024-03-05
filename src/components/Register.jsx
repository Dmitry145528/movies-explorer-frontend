import AuthForm from "./AuthForm"
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import * as Auth from "../utils/Auth"
import mainApi from "../utils/MainApi";

function Register(props) {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (formValue) => {
    if (!isSubmitting && formValue.password && formValue.email && formValue.name) {
      setIsSubmitting(true); // блокируем форму при начале отправки запроса

      const { password, email, name } = formValue;
      Auth.register(password, email, name)
        .then((data) => {
          if (data._id) {
            mainApi.getProfileInfo(data._id).then((res) => {
              if (res) {
                props.handleLogin(true);
                setError('');
                navigate('/movies', { replace: true });
              }
            })
          }
        })
        .catch((err) => {
          setError(err.status === 409 ? err.error.message : 'При регистрации пользователя произошла ошибка.');
          console.error('Ошибка при запросе регистрации:', err.error.message);
        })
        .finally(() => {
          setIsSubmitting(false); // разблокируем форму после завершения запроса
        });
    }
  }

  return (
    <AuthForm
      title="Добро пожаловать!"
      onSubmit={handleSubmit}
      buttonText="Зарегистрироваться"
      linkText="Уже зарегистрированы?"
      linkTo="/signin"
      error={error}
      isSubmitting={isSubmitting}
    />
  );
}

export default Register