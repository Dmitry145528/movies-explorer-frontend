import {
  BASE_URL,
  ENDPOINT_SIGNUP,
  ENDPOINT_SIGNIN,
  ENDPOINT_SIGNOUT
} from './constans';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((error) => {
      return Promise.reject({ error, status: res.status });
    });
  }
}

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
}

const register = (password, email, name) => {
  return request(`${BASE_URL}${ENDPOINT_SIGNUP}`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email, name })
  })
    .then((data) => {
      if (data._id) {
        localStorage.setItem('userId', data._id);
        return data;
      } else {
        return;
      }
    })
}

const onLogin = (password, email) => {
  return request(`${BASE_URL}${ENDPOINT_SIGNIN}`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((data) => {
      if (data._id) {
        localStorage.setItem('userId', data._id);
        return data;
      } else {
        return;
      }
    })
}

const onLogout = () => {
  return request(`${BASE_URL}${ENDPOINT_SIGNOUT}`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export { register, onLogin, onLogout };