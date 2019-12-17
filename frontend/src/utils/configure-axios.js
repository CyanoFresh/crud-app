import axios from 'axios';
import { logout } from '../redux/actions/auth';

export const setupAxios = store => {
  axios.defaults.baseURL = window.location.protocol === 'https:'
    ? process.env.REACT_APP_API_BASE_URL
    : process.env.REACT_APP_API_BASE_LOCAL_URL;

  axios.interceptors.response.use(response => response, (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout(false));
    }

    return Promise.reject(error);
  });
};
