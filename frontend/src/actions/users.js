import { LOADED_USERS, LOADING_USERS_ERROR, LOADING_USERS } from './types';
import axios from 'axios';

export const loadUsers = () => async (dispatch) => {
  dispatch({
    type: LOADING_USERS,
  });

  try {
    const response = await axios.get('/users');

    if (response.data.ok) {
      return dispatch({
        type: LOADED_USERS,
        users: response.data.users,
      });
    }

    return dispatch({
      type: LOADING_USERS_ERROR,
      error: `Error: ${response.data.error}`,
    });
  } catch (e) {
    const error = (e.response && (e.response.data.message || e.response.statusText)) || e.message;

    dispatch({
      type: LOADING_USERS_ERROR,
      error,
    });
  }
};
