import axios from 'axios';

export const getUserData = (token) => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:5005/store', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export const putUserData = (token, data) => {
  return new Promise((resolve, reject) => {
    axios.put('http://localhost:5005/store', {
      store: data
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

