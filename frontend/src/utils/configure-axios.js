import axios from 'axios';
import { push } from 'connected-react-router';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

export const setupAxios = store => {
  axios.interceptors.response.use(response => response, (error) => {
    debugger;

    if (error.response.status === 401) {
      store.dispatch(push('/login'));
    }

    return Promise.reject(error);
  });
};
