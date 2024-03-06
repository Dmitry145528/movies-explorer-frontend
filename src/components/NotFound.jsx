import { useNavigate } from 'react-router-dom';
import { ENDPOINT_MAIN } from '../utils/constans';

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      // Если есть предыдущая страница в истории, вернуться на неё
      navigate(-1);
    } else {
      // Если нет предыдущей страницы, перейти на главную страницу
      navigate(ENDPOINT_MAIN);
    }
  };
  
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__link" onClick={goBack} >Назад</button>
    </section>
  )
}

export default NotFound;