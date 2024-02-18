import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

function MoviesCard(props) {

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <li className="element" key={props.movie._id}>
      <img className="element__video" alt={props.movie.name} src={props.movie.image}/>
      <div className="element__pos-element">
        <h2 className="element__title">{props.movie.name}</h2>
        <button className={currentPath === '/movies' ? "element__heart" : "element__heart element__delete"}></button>
      </div>
      <p className="element__duration">{props.movie.duration}</p>
    </li>
  )
}

export default MoviesCard