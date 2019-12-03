import { ADD_USER, DELETED_USER, DELETING_USER, LOADED_USERS, LOADING_USERS } from '../actions/users';

const initialState = {
  users: [],
  loading: true,
  error: null,
  deletingId: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_USERS:
      return {
        ...state,
        loading: true,
      };
    case LOADED_USERS:
      return {
        ...state,
        users: action.users,
        loading: false,
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
