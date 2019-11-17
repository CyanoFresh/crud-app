import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Users from '../pages/Users';

const PrivateApp = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
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

export default PrivateApp;
