import axios from 'axios';
import { push } from 'connected-react-router'

export const LOADING_USERS = 'LOADING_USERS';
export const LOADED_USERS = 'LOADED_USERS';
export const LOADING_USERS_ERROR = 'LOADING_USERS_ERROR';

export const LOADING_USER = 'LOADING_USER';
export const LOADED_USER = 'LOADED_USER';
export const LOADING_USER_ERROR = 'LOADING_USERS_ERROR';

export const ADD_USER = 'ADD_USER';
export const ADD_USER_MODAL = 'ADD_USER_MODAL';
export const ADDING_USER = 'ADDING_USER';
export const ADDING_USER_ERROR = 'ADDING_USER_ERROR';

export const DELETING_USER = 'DELETING_USER';
export const DELETING_USER_ERROR = 'DELETING_USER_ERROR';
export const DELETED_USER = 'DELETED_USER';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATING_USER = 'UPDATING_USER';
export const UPDATING_USER_ERROR = 'UPDATING_USER_ERROR';

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

export const loadUser = (id) => async (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });

  try {
    const response = await axios.get(`/users/${id}`);

    if (response.data.ok) {
      return dispatch({
        type: LOADED_USER,
        payload: response.data.user,
      });
    }

    debugger;

    return dispatch({
      type: LOADING_USER_ERROR,
      error: `Error: ${response.data.error}`,
    });
  } catch (e) {
    const error = (e.response && (e.response.data.message || e.response.statusText)) || e.message;

    dispatch({
      type: LOADING_USER_ERROR,
      error,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({
    type: DELETING_USER,
    payload: id,
  });

  try {
    const response = await axios.delete(`/users/${id}`);

    if (response.data.ok) {
      return dispatch({
        type: DELETED_USER,
        payload: id,
      });
    }

    return dispatch({
      type: DELETING_USER_ERROR,
      error: `Error: ${response.data.error}`,
      payload: id,
    });
  } catch (e) {
    const error = (e.response && (e.response.data.message || e.response.statusText)) || e.message;

    dispatch({
      type: DELETING_USER_ERROR,
      error,
      payload: id,
    });
  }
};

export const changeUserModal = (isOpen) => (dispatch) => {
  dispatch({
    type: ADD_USER_MODAL,
    payload: isOpen,
  });
};

export const createUser = (data) => async (dispatch) => {
  dispatch({
    type: ADDING_USER,
  });

  try {
    const response = await axios.post(`/users`, data);

    if (response.data.ok) {
      return dispatch({
        type: ADD_USER,
        payload: response.data.user,
      });
    }

    return dispatch({
      type: ADDING_USER_ERROR,
      error: `Error: ${response.data.error}`,
    });
  } catch (e) {
    const error = (e.response && (e.response.data.message || e.response.statusText)) || e.message;

    dispatch({
      type: ADDING_USER_ERROR,
      error,
    });
  }
};

export const updateUser = ({ id, ...data }) => async (dispatch) => {
  dispatch({
    type: UPDATING_USER,
  });

  try {
    const response = await axios.put(`/users/${id}`, data);

    if (response.data.ok) {
      dispatch({
        type: UPDATE_USER,
        payload: response.data.user,
      });

      return dispatch(push('/users'));
    }

    return dispatch({
      type: UPDATING_USER_ERROR,
      error: `Error: ${response.data.error}`,
    });
  } catch (e) {
    const error = (e.response && (e.response.data.message || e.response.statusText)) || e.message;

    dispatch({
      type: UPDATING_USER_ERROR,
      error,
    });
  }
};
