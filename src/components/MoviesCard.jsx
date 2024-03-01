import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import mainApi from '../utils/MainApi';

function MoviesCard({ movie, likedMovies }) {

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setIsLiked(likedMovies.some((likedMovie) => likedMovie === movie.id));
  }, []);

  // Функция для преобразования времени в формат "часы и минуты"
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Создаем строку в формате "часы и минуты"
    const formattedDuration = `${hours > 0 ? `${hours}ч` : ''} ${remainingMinutes > 0 ? `${remainingMinutes}м` : ''}`;

    return formattedDuration.trim(); // Убираем лишние пробелы
  };

  const handleCardLike = () => {

    const movieData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    if (!isLiked) {
      mainApi.addMovie(movieData)
        .then(() => {
          setIsLiked(true);
        })
        .catch((err) => console.error('Ошибка при добавлении фильма:', err));
    } else {
      mainApi.deleteMovie(movieData.movieId)
        .then(() => {
          setIsLiked(false);
        })
        .catch((err) => console.error('Ошибка при удалении фильма:', err));
    }
  }

  return (
    <li className="element" key={movie.id}>
      <a className="element__link" href={movie.trailerLink} rel="noreferrer noopener" target="_blank">
        <img className="element__image" alt={movie.nameRU} src={`https://api.nomoreparties.co${movie.image.url}`} />
      </a>
      <div className="element__pos-element">
        <h2 className="element__title">{movie.nameRU}</h2>
        <button className={currentPath === '/movies' ? `element__heart ${isLiked ? "element__heart_active" : ""}` : "element__heart element__delete"} onClick={handleCardLike}></button>
      </div>
      <p className="element__duration">{formatDuration(movie.duration)}</p>
    </li>
  )
}

export default MoviesCard;