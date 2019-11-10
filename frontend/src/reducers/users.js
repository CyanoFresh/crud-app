import { ADD_USER, DELETE_USER, LOADED_USERS, LOADING_USERS } from '../actions/types';

const initialState = {
  users: [],
  loading: true,
  error: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_USERS: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOADED_USERS: {
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    }
    case ADD_USER: {
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.id),
      };
    }
    default:
      return state;
  }
}
