import AuthForm from "./AuthForm"
import { useNavigate } from "react-router-dom"
import * as Auth from "../utils/Auth"
import mainApi from "../utils/MainApi";

function Login(props) {

  const navigate = useNavigate();

  const handleSubmit = (formValue) => {
    if (formValue.password && formValue.email) {
      const { password, email } = formValue;
      Auth.onLogin(password, email)
        .then((data) => {
          if (data._id) {
            mainApi.getProfileInfo(data._id).then((res) => {
              if (res) {
                props.handleLogin(true);
                navigate('/', { replace: true });
              }
            });
          }
        })
        .catch(err => {
          console.log('Ошибка при запросе авторизации:', err);
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
    />
  );
}

export default Login