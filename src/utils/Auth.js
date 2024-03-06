import BASE_URL from './constans';

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
  return request(`${BASE_URL}/signup`, {
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
  return request(`${BASE_URL}/signin`, {
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
  return request(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export { BASE_URL, register, onLogin, onLogout }