import MePhoto from '../images/me-photo.jpg'

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <article className="about-me__description">
          <h3 className="about-me__description_title">Дмитрий</h3>
          <h4 className="about-me__description_subtitle">Фронтенд-разработчик, 24 года</h4>
          <p className="about-me__description_text">Я родился в Москве и сейчас учусь на курсе веб-разработчика от Яндекс Практикума. Каждый день для меня – это новые строчки кода и открытия в мире программирования. Я также работаю в магазине музыкальных инструментов.</p>
          <a href="https://github.com/Dmitry145528" rel="noreferrer noopener"
            target="_blank" className="about-me__description_link">Github</a>
        </article>
        <img src={MePhoto} alt="Фото автора дипломной работы" className="about-me__photo" />
      </div>
    </section>
  )
}

export default AboutMe