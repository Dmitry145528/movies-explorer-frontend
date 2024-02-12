import { Link } from "react-router-dom"

function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__link" to="/" >Назад</Link>
    </section>
  )
}

export default NotFound