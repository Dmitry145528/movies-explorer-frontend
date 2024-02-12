import AuthForm from "./AuthForm"

function Login() {

  const handleSubmit = (e) => {
    e.preventDefault();
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