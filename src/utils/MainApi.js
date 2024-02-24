class MainApi {
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

  getProfileInfo() {
    return this.request(`${this._url}/users/me`, {
      credentials: "include",
      headers: this._headers
    });
  }

  setProfileInfo({ name, email }) {
    return this.request(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ name, email })
    });
  }
}

const mainApi = new MainApi({
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;