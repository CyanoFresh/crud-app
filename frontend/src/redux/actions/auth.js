import axios from 'axios';
import {
  AUTHENTICATED,
  AUTHENTICATING,
  AUTHENTICATION_ERROR,
  LOGGED_OUT,
} from './types';

export const authenticate = (data) => async (dispatch) => {
  dispatch({
    type: AUTHENTICATING,
  });

  try {
    const res = await axios.post('/auth/login', data);

    if (!res.data.ok) {
      return dispatch({
        type: AUTHENTICATION_ERROR,
        error: `Error: ${res.data.error}`,
      });
    }

    return dispatch({
      type: AUTHENTICATED,
      payload: res.data.user,
    });
  } catch (e) {
    const error = (e.response && (e.response.data.message || e.response.statusText)) || e.message;

    console.error('caught auth error', e);

    return dispatch({
      type: AUTHENTICATION_ERROR,
      error,
    });
  }
};

export const logout = (revokeToken = true) => async (dispatch) => {
  dispatch({
    type: LOGGED_OUT,
  });

  if (revokeToken) {
    await axios.post('/auth/logout');
  }
};
