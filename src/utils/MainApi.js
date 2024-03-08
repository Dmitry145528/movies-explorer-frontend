import {
  BASE_URL,
  ENDPOINT_MOVIES,
  ENDPOINT_USERS_ME
} from './constans';

class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((error) => {
        return Promise.reject({ error, status: res.status });
      });
    }
  }

  request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getProfileInfo() {
    return this.request(`${this._url}${ENDPOINT_USERS_ME}`, {
      credentials: "include",
      headers: this._headers
    });
  }

  setProfileInfo({ name, email }) {
    return this.request(`${this._url}${ENDPOINT_USERS_ME}`, {
      credentials: "include",
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email })
    });
  }

  addMovie(movieData) {
    return this.request(`${this._url}${ENDPOINT_MOVIES}`, {
      credentials: "include",
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(movieData)
    });
  }

  deleteMovie(id) {
    return this.request(`${this._url}${ENDPOINT_MOVIES}/${id}`, {
      credentials: "include",
      headers: this._headers,
      method: 'DELETE',
    });
  }

  getLikedMovies() {
    return this.request(`${this._url}${ENDPOINT_MOVIES}`, {
      credentials: "include",
      headers: this._headers
    });
  }
}

const mainApi = new MainApi({
  url: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;