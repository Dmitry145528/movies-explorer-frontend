import AuthForm from "./AuthForm"
import { useNavigate } from "react-router-dom"

function Login(props) {

  const navigate = useNavigate();

  const handleSubmit = () => {
    props.handleLogin();
    navigate('/', { replace: true });
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