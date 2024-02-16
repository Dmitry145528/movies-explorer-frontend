import SearchForm from './SearchForm'
import MoviesCardList from './MoviesCardList'
import MoviesCard from './MoviesCard'
import { useState } from 'react'

function Movies() {

  const [movies, setMovies] = useState([{
    "_id": "65b28d0878a312c737b367e5",
    "name": "Круг 2",
    "duration": "1ч42м",
    "image": "https://steamuserimages-a.akamaihd.net/ugc/1280660303510875511/48B4EDCB3E63D28A53516A1C674F98B543F541FB/?imw=512&amp;imh=384&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
  }, {
    "_id": "65b28d0878a312c737b367e5",
    "name": "Круг 2",
    "duration": "1ч42м",
    "image": "https://steamuserimages-a.akamaihd.net/ugc/1280660303510875511/48B4EDCB3E63D28A53516A1C674F98B543F541FB/?imw=512&amp;imh=384&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
  }, {
    "_id": "65b28d0878a312c737b367e5",
    "name": "Круг 2",
    "duration": "1ч42м",
    "image": "https://steamuserimages-a.akamaihd.net/ugc/1280660303510875511/48B4EDCB3E63D28A53516A1C674F98B543F541FB/?imw=512&amp;imh=384&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
  }, {
    "_id": "65b28d0878a312c737b367e5",
    "name": "Круг 2",
    "duration": "1ч42м",
    "image": "https://steamuserimages-a.akamaihd.net/ugc/1280660303510875511/48B4EDCB3E63D28A53516A1C674F98B543F541FB/?imw=512&amp;imh=384&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
  }, {
    "_id": "65b28d0878a312c737b367e5",
    "name": "Круг 2",
    "duration": "1ч42м",
    "image": "https://steamuserimages-a.akamaihd.net/ugc/1280660303510875511/48B4EDCB3E63D28A53516A1C674F98B543F541FB/?imw=512&amp;imh=384&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
  }, {
    "_id": "65b28d0878a312c737b367e5",
    "name": "Круг 2",
    "duration": "1ч42м",
    "image": "https://steamuserimages-a.akamaihd.net/ugc/1280660303510875511/48B4EDCB3E63D28A53516A1C674F98B543F541FB/?imw=512&amp;imh=384&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
  }, {
    "_id": "65b28d0878a312c737b367e5",
    "name": "Круг 2",
    "duration": "1ч42м",
    "image": "https://steamuserimages-a.akamaihd.net/ugc/1280660303510875511/48B4EDCB3E63D28A53516A1C674F98B543F541FB/?imw=512&amp;imh=384&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
  }, {
    "_id": "65b28d0878a312c737b367e5",
    "name": "Круг 2",
    "duration": "1ч42м",
    "image": "https://steamuserimages-a.akamaihd.net/ugc/1280660303510875511/48B4EDCB3E63D28A53516A1C674F98B543F541FB/?imw=512&amp;imh=384&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
  }, {
    "_id": "65b28d0878a312c737b367e5",
    "name": "Круг 2",
    "duration": "1ч42м",
    "image": "https://steamuserimages-a.akamaihd.net/ugc/1280660303510875511/48B4EDCB3E63D28A53516A1C674F98B543F541FB/?imw=512&amp;imh=384&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
  }, {
    "_id": "65b28d0878a312c737b367e5",
    "name": "Круг 2",
    "duration": "1ч42м",
    "image": "https://steamuserimages-a.akamaihd.net/ugc/1280660303510875511/48B4EDCB3E63D28A53516A1C674F98B543F541FB/?imw=512&amp;imh=384&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
  }, {
    "_id": "65b28d0878a312c737b367e5",
    "name": "Круг 2",
    "duration": "1ч42м",
    "image": "https://steamuserimages-a.akamaihd.net/ugc/1280660303510875511/48B4EDCB3E63D28A53516A1C674F98B543F541FB/?imw=512&amp;imh=384&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
  }]);

  return (
    <main>
      <SearchForm />
      <MoviesCardList
        movieItems={movies.map(movie => (
          <MoviesCard
            key={movie._id}
            movie={movie}
          />
        ))} />
    </main >
  )
}

export default Movies