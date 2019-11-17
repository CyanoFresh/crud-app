import axios from 'axios';
import { AUTHENTICATED, AUTHENTICATING, AUTHENTICATION_ERROR } from './types';

export const authenticate = (data) => (dispatch) => {
  dispatch({
    type: AUTHENTICATING,
  });

  axios.post('/auth/login', data)
    .then(res => {
      if (!res.data.ok) {
        return dispatch({
          type: AUTHENTICATION_ERROR,
          error: `Error: ${res.data.error}`,
        });
      }

      return dispatch({
        type: AUTHENTICATED,
      });
    })
    .catch(e => {
      const error = e.status === 401 ? 'Wrong username or password' : e.message;

      dispatch({
        type: AUTHENTICATION_ERROR,
        error,
      });
    });
};
