import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import socket from './socket';
import users from './users';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  socket,
  users,
  form: formReducer,
});
