import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../pages/Home';
import Users from '../pages/Users';
import { logout } from '../actions/auth';

const PrivateApp = ({ logout }) => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <button onClick={logout}>Log out</button>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
      </Switch>
    </>
  );
};

export default connect(null, { logout })(PrivateApp);
