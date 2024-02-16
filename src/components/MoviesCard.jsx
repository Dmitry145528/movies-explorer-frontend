function MoviesCard(props) {
  return (
    <li className="element" key={props.movie._id}>
      <img className="element__video" alt={props.movie.name} src={props.movie.image}/>
      <div className="element__pos-element">
        <h2 className="element__title">{props.movie.name}</h2>
        <button className="element__heart"></button>
      </div>
      <p className="element__duration">{props.movie.duration}</p>
    </li>
  )
}

export default MoviesCard