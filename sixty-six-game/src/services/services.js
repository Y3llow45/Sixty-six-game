const url = 'http://localhost:5000/';

export const register = (username, password) => {
  let user = { username, password }
  return fetch(`${url}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
}

export const login = (username, password) => {
  let user = { username, password }
  return fetch(`${url}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
}

export const checkUsername = (username) => {
  return fetch(`${url}checkUsername/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'true') {
        displayInfo("Username already exists")
        return true;
      }
      return false;
    })
    .catch(
      (error) => console.log(error)
    );
};