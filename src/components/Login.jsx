import AuthForm from "./AuthForm"
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import * as Auth from "../utils/Auth"
import mainApi from "../utils/MainApi";

function Login(props) {

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (formValue) => {
    if (formValue.password && formValue.email) {
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
    />
  );
}

export default Login