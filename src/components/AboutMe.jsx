function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <article className="about-me__description">
          <h3 className="about-me__description_title">Дмитрий</h3>
          <h4 className="about-me__description_subtitle">Фронтенд-разработчик, 24 года</h4>
          <p className="about-me__description_text">Я родился в Москве и сейчас учусь на курсе веб-разработчика от Яндекс Практикума. Каждый день для меня – это новые строчки кода и открытия в мире программирования. Кроме того, я также работаю в компании MuzMsk и являюсь одним из основателей компании MUZKABEL</p>
          <a href="https://github.com/Dmitry145528" className="about-me__description_link">Github</a>
        </article>
        <img src="./src/images/me-photo.jpg" alt="" className="about-me__photo" />
      </div>
    </section>
  )
}

export default AboutMe