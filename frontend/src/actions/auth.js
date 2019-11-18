import axios from 'axios';
import {
  AUTHENTICATED,
  AUTHENTICATING,
  AUTHENTICATION_ERROR,
  LOGGED_OUT,
} from './types';

export const authenticate = (data) => (dispatch) => {
  dispatch({
    type: AUTHENTICATING,
  });

  axios.post('/auth/login', data)
    .then(res => {
      if (!res.data.ok) {
        console.log(res);

        return dispatch({
          type: AUTHENTICATION_ERROR,
          error: `Error: ${res.data.error}`,
        });
      }

      dispatch({
        type: AUTHENTICATED,
      });
    })
    .catch(e => {
      const error = (e.response && (e.response.data.message || e.response.statusText)) || e.message;

      console.log(e);

      dispatch({
        type: AUTHENTICATION_ERROR,
        error,
      });
    });
};

export const logout = () => (dispatch) => {
  axios.post('/auth/logout')
    .then(() => {
      dispatch({
        type: LOGGED_OUT,
      });
    });
};
