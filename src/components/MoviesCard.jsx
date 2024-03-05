import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import mainApi from '../utils/MainApi';

function MoviesCard({ movie, likedMovies, onDelete }) {

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setIsLiked(likedMovies.some((likedMovie) => likedMovie === movie.id ? movie.id : movie.movieId));
  }, [likedMovies.length]);

  // Функция для преобразования времени в формат "часы и минуты"
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Создаем строку в формате "часы и минуты"
    const formattedDuration = `${hours > 0 ? `${hours}ч` : ''} ${remainingMinutes > 0 ? `${remainingMinutes}м` : ''}`;

    return formattedDuration.trim(); // Убираем лишние пробелы
  };

  console.log(likedMovies);

  const handleCardLike = () => {

    const movieData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image,
      trailerLink: movie.trailerLink,
      thumbnail: movie.image && movie.image.formats && movie.image.formats.thumbnail
        ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
        : movie.thumbnail,
      movieId: movie.id ? movie.id : movie.movieId,
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
          onDelete(movieData.movieId);
        })
        .catch((err) => console.error('Ошибка при удалении фильма:', err));
    }
  }

  return (
    <li className="element" key={movie.id}>
      <a className="element__link" href={movie.trailerLink} rel="noreferrer noopener" target="_blank">
        <img className="element__image" alt={movie.nameRU} src={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image} />
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