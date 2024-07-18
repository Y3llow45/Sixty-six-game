import { displayInfo, displaySuccess } from "../components/Notify/Notify";
const url = 'http://localhost:5242/';

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

export const test = () => {
  return fetch(`${url}test`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'created') {
        displaySuccess('Created!')
        return true;
      }
      return false;
    })
    .catch(
      (error) => console.log(error)
    );
};