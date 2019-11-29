import axios from 'axios';
import { logout } from '../actions/auth';

export const setupAxios = store => {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

  axios.interceptors.response.use(response => response, (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout(false));
    }

    return Promise.reject(error);
  });
};
