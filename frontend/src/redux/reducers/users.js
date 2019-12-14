import {
  ADD_USER,
  DELETED_USER,
  DELETING_USER, LOADED_USER,
  LOADED_USERS, LOADING_USER,
  LOADING_USERS,
  LOADING_USERS_ERROR,
} from '../actions/users';

const initialState = {
  users: [],
  user: null,
  deletingId: null,
  loading: true,
  error: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_USERS:
      return {
        ...state,
        loading: true,
      };
    case LOADING_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case LOADED_USERS:
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LOADED_USER:
      return {
        ...state,
        user: action.user,
        loading: false,
        error: null,
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case DELETING_USER:
      return {
        ...state,
        deletingId: action.payload,
      };
    case DELETED_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    default:
      return state;
  }
}
