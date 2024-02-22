import AuthForm from "./AuthForm"

function Register() {

  const handleSubmit = (e) => {
    e.preventDefault();
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