class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
    }
  }

  request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialMovies() {
    return this.request(`${this._url}`, {
      headers: this._headers
    });
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;