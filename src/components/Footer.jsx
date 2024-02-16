function Footer() {
  return (
    <section className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <aside className="footer__content">
        <p className="footer__content_date">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__list">
          <li><a href="https://practicum.yandex.ru" className="footer__list_link">Яндекс.Практикум</a></li>
          <li><a href="https://github.com/Dmitry145528" className="footer__list_link">Github</a></li>
        </ul>
      </aside>
    </section>
  )
}

export default Footer