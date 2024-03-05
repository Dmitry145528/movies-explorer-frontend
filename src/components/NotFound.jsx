import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Переход на предыдущую страницу в истории
  };
  
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__link" onClick={goBack} >Назад</button>
    </section>
  )
}

export default NotFound