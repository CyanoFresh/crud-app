import {
  AUTHENTICATED,
  AUTHENTICATING,
  AUTHENTICATION_ERROR,
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
        loading: true,
        error: null,
      };
    }
    case AUTHENTICATION_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
