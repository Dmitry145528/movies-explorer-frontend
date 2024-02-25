import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

function MoviesCard(props) {

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  // Функция для преобразования времени в формат "часы и минуты"
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Создаем строку в формате "часы и минуты"
    const formattedDuration = `${hours > 0 ? `${hours}ч` : ''} ${remainingMinutes > 0 ? `${remainingMinutes}м` : ''}`;

    return formattedDuration.trim(); // Убираем лишние пробелы
  };

  return (
    <li className="element" key={props.movie.id}>
      <img className="element__video" alt={props.movie.nameRU} src={`https://api.nomoreparties.co${props.movie.image.url}`} />
      <div className="element__pos-element">
        <h2 className="element__title">{props.movie.nameRU}</h2>
        <button className={currentPath === '/movies' ? "element__heart" : "element__heart element__delete"}></button>
      </div>
      <p className="element__duration">{formatDuration(props.movie.duration)}</p>
    </li>
  )
}

export default MoviesCard