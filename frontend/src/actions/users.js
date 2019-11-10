import { ADD_USER, LOADED_USERS, LOADING_USERS_ERROR, LOADING_USERS } from './types';

export const loadUsers = () => (dispatch) => {
  dispatch({
    type: LOADING_USERS,
  });

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(
      users => dispatch({
        type: LOADED_USERS,
        users,
      }),
      error => dispatch({
        type: LOADING_USERS_ERROR,
        error,
      }),
    );
};

export const addUser = (userData) => (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  })
    .then(res => res.json())
    .then(
      user => dispatch({
        type: ADD_USER,
        payload: user,
      }),
      error => dispatch({
        type: LOADING_USERS_ERROR,
        error,
      }),
    );
};
