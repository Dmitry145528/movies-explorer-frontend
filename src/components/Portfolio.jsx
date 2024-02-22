import ArrowLink from '../images/arrow-link.svg'

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <aside>
        <ul className="portfolio__list">
          <li><a href="https://github.com/Dmitry145528/how-to-learn" rel="noreferrer noopener"
            target="_blank" className="portfolio__list_link">Статичный сайт<img src={ArrowLink} alt="Ссылка ввиде стрелки" className="portfolio__list_img" /></a></li>
          <li><a href="https://github.com/Dmitry145528/russian-travel" rel="noreferrer noopener"
            target="_blank" className="portfolio__list_link">Адаптивный сайт<img src={ArrowLink} alt="Ссылка ввиде стрелки" className="portfolio__list_img" /></a></li>
          <li><a href="https://github.com/Dmitry145528/react-mesto-api-full-gha" rel="noreferrer noopener"
            target="_blank" className="portfolio__list_link">Одностраничное приложение<img src={ArrowLink} alt="Ссылка ввиде стрелки" className="portfolio__list_img" /></a></li>
        </ul>
      </aside>
    </section>
  )
}

export default Portfolio