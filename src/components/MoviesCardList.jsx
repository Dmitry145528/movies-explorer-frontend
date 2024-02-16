function MoviesCardList(props) {
  return (
    <section className="elements">
      <ul className="elements__grid-items">
        {props.movieItems}
      </ul>
    </section>
  )
}

export default MoviesCardList