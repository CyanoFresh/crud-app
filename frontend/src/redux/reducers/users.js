import {
  ADD_USER, ADD_USER_MODAL, ADDING_USER, ADDING_USER_ERROR,
  DELETED_USER,
  DELETING_USER, DELETING_USER_ERROR, LOADED_USER,
  LOADED_USERS, LOADING_USER, LOADING_USER_ERROR,
  LOADING_USERS,
  LOADING_USERS_ERROR, UPDATE_USER, UPDATING_USER, UPDATING_USER_ERROR,
} from '../actions/users';

const initialState = {
  users: [],
  deletingId: null,
  loading: true,
  error: null,
  newUser: {
    open: false,
    error: null,
    loading: false,
  },
  user: {
    user: null,
    loading: false,
    error: null,
  },
  updatingUser: {
    loading: false,
    error: null,
  },
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
        error: null,
      };
    case LOADING_USER:
      return {
        ...state,
        user: { ...state.user, loading: true, error: null },
      };
    case LOADING_USER_ERROR:
      return {
        ...state,
        user: { ...state.user, loading: false, error: action.error },
      };
    case LOADED_USER:
      return {
        ...state,
        user: { ...state.user, loading: false, error: null, user: action.payload },
      };
    case UPDATING_USER:
      return {
        ...state,
        updatingUser: { ...state.updatingUser, loading: true, error: null },
      };
    case UPDATING_USER_ERROR:
      return {
        ...state,
        updatingUser: { ...state.updatingUser, loading: false, error: action.error },
      };
    case UPDATE_USER:
      return {
        ...state,
        updatingUser: { ...state.updatingUser, loading: false, error: null },
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
        newUser: { ...state.newUser, loading: false, error: null, open: false },
      };
    case ADD_USER_MODAL:
      return {
        ...state,
        newUser: { ...state.newUser, open: action.payload },
      };
    case ADDING_USER:
      return {
        ...state,
        newUser: { ...state.newUser, loading: true, error: null },
      };
    case ADDING_USER_ERROR:
      return {
        ...state,
        newUser: { ...state.newUser, loading: false, error: action.error },
      };
    case DELETING_USER:
      return {
        ...state,
        deletingId: action.payload,
      };
    case DELETED_USER:
      return {
        ...state,
        deletingId: null,
        users: state.users.filter(user => user.id !== action.payload),
      };
    case DELETING_USER_ERROR:
      return {
        ...state,
        deletingId: null,
        error: action.error,
      };
    default:
      return state;
  }
}
