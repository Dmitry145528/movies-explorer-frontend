import AuthForm from "./AuthForm"
import { useNavigate } from "react-router-dom"
import * as Auth from "../utils/Auth"

function Register() {

  const navigate = useNavigate();

  const handleSubmit = (formValue) => {
    if (formValue.password && formValue.email && formValue.name) {
      const { password, email, name } = formValue;
      Auth.register(password, email, name)
        .then(() => {
          navigate("/signin", { replace: true });
        })
        .catch((err) => {
          console.log('Ошибка при запросе регистрации:', err);
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
    />
  );
}

export default Register