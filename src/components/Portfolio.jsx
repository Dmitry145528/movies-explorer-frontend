function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <aside>
        <ul className="portfolio__list">
          <li><a href="https://github.com/Dmitry145528/how-to-learn" className="portfolio__list_link">Статичный сайт<img src="./src/images/arrow-link.svg" alt="Ссылка ввиде стрелки" className="portfolio__list_img" /></a></li>
          <li><a href="https://github.com/Dmitry145528/russian-travel" className="portfolio__list_link">Адаптивный сайт<img src="./src/images/arrow-link.svg" alt="Ссылка ввиде стрелки" className="portfolio__list_img" /></a></li>
          <li><a href="https://github.com/Dmitry145528/react-mesto-api-full-gha" className="portfolio__list_link">Одностраничное приложение<img src="./src/images/arrow-link.svg" alt="Ссылка ввиде стрелки" className="portfolio__list_img" /></a></li>
        </ul>
      </aside>
    </section>
  )
}

export default Portfolio