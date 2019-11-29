import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import users from './users';
import auth from './auth';

export default (history) => combineReducers({
  router: connectRouter(history),
  users,
  auth,
});
