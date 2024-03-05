import AuthForm from "./AuthForm"
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import * as Auth from "../utils/Auth"
import mainApi from "../utils/MainApi";

function Login(props) {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (formValue) => {
    if (!isSubmitting && formValue.password && formValue.email) {
      setIsSubmitting(true); // блокируем форму при начале отправки запроса

      const { password, email } = formValue;
      Auth.onLogin(password, email)
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
        .catch(err => {
          setError(err.status === 401 ? err.error.message : 'При авторизации произошла ошибка.');
          console.error('Ошибка при запросе авторизации:', err.error.message);
        })
        .finally(() => {
          setIsSubmitting(false); // разблокируем форму после завершения запроса
        });
    }
  }

  return (
    <AuthForm
      title="Рады видеть!"
      onSubmit={handleSubmit}
      buttonText="Войти"
      linkText="Ещё не зарегистрированы?"
      linkTo="/signup"
      error={error}
      isSubmitting={isSubmitting}
    />
  );
}

export default Login;