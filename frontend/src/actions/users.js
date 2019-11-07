import { ADD_USER, FETCH_USERS, USER_ERROR } from './types';

export const fetchUsers = () => (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => dispatch({
      type: FETCH_USERS,
      payload: data,
    }));
};

export const addUser = (userData) => (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(userData),
  })
    .then(res => res.json())
    .then(user => dispatch({
      type: ADD_USER,
      payload: user,
    }))
    .catch(error => dispatch({
      type: USER_ERROR,
      error,
    }));
};
