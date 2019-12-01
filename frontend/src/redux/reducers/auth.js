import {
  AUTHENTICATED,
  AUTHENTICATING,
  AUTHENTICATION_ERROR,
  LOGGED_OUT,
} from '../actions/types';

const loadInitialState = () => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
  }

  return {
    isLoggedIn: Boolean(user),
    loading: false,
    error: null,
    user,
  };
};

const initialState = loadInitialState();

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED: {
      const user = action.payload;

      localStorage.setItem('user', JSON.stringify(user));

      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        error: null,
        user,
      };
    }
    case AUTHENTICATING: {
      localStorage.removeItem('user');
      return {
        ...state,
        isLoggedIn: false,
        loading: true,
        error: null,
        user: {},
      };
    }
    case AUTHENTICATION_ERROR: {
      localStorage.removeItem('user');
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        error: action.error,
        user: {},
      };
    }
    case LOGGED_OUT: {
      localStorage.removeItem('user');
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
    }
    default:
      return state;
  }
}
