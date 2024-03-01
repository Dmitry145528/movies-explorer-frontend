function MoviesCardList({ movieItems }) {
  return (
    <section className="elements">
      <ul className="elements__grid-items">
        {movieItems}
      </ul>
    </section>
  )
}

export default MoviesCardList