import {
  AUTHENTICATED,
  AUTHENTICATING,
  AUTHENTICATION_ERROR, LOGGED_OUT,
} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED: {
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    }
    case AUTHENTICATING: {
      return {
        ...state,
        isLoggedIn: false,
        loading: true,
        error: null,
      };
    }
    case AUTHENTICATION_ERROR: {
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        error: action.error,
      };
    }
    case LOGGED_OUT: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
}
